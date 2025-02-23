import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { hash, compare } from "bcryptjs";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/email";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
}; 

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hash(password, 12);
  const verificationToken = randomBytes(32).toString("hex");
  const hashedToken = await hash(verificationToken, 12);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  await db.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
    },
  });

  await sendVerificationEmail(email, verificationToken);

  return user;
}

export async function verifyEmail(token: string) {
  const hashedToken = await hash(token, 12);
  
  const verificationToken = await db.verificationToken.findFirst({
    where: {
      token: hashedToken,
      expires: {
        gt: new Date(),
      },
    },
  });

  if (!verificationToken) {
    throw new Error("Invalid or expired verification token");
  }

  await db.user.update({
    where: {
      email: verificationToken.identifier,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await db.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verificationToken.identifier,
        token: hashedToken,
      },
    },
  });
}

export async function resetPassword(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Return silently to prevent email enumeration
    return;
  }

  const resetToken = randomBytes(32).toString("hex");
  const hashedToken = await hash(resetToken, 12);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await db.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
    },
  });

  await sendPasswordResetEmail(email, resetToken);
}

export async function updatePassword(token: string, newPassword: string) {
  const hashedToken = await hash(token, 12);
  
  const verificationToken = await db.verificationToken.findFirst({
    where: {
      token: hashedToken,
      expires: {
        gt: new Date(),
      },
    },
  });

  if (!verificationToken) {
    throw new Error("Invalid or expired reset token");
  }

  const hashedPassword = await hash(newPassword, 12);

  await db.user.update({
    where: {
      email: verificationToken.identifier,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verificationToken.identifier,
        token: hashedToken,
      },
    },
  });
} 
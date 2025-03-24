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
    maxAge: 30 * 24 * 60 * 60, // 30 days
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
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
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

        if (!user || !user.password) {
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
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!user.email) {
          return false;
        }
        // Check if user exists
        const existingUser = await db.user.findUnique({
          where: { email: user.email }
        });

        if (!existingUser) {
          // Create new user if they don't exist
          await db.user.create({
            data: {
              email: user.email,
              name: user.name,
              emailVerified: new Date(), // Google accounts are pre-verified
              image: user.image
            }
          });
        }
        return true;
      }

      // For credentials, check email verification
      if (account?.provider === "credentials") {
        const dbUser = await db.user.findUnique({
          where: { email: user.email! }
        });
        return !!(dbUser?.emailVerified);
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        // Add additional user data if needed
        const user = await db.user.findUnique({
          where: { id: token.sub }
        });
        if (user) {
          session.user.name = user.name;
          session.user.email = user.email;
          session.user.image = user.image;
        }
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.sub = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    }
  },
  events: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        // Update user data on each sign in to keep it in sync with Google
        await db.user.update({
          where: { email: user.email! },
          data: {
            name: user.name,
            image: user.image
          }
        });
      }
    }
  },
  debug: process.env.NODE_ENV === "development"
};

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await hash(password, 12);
  const verificationToken = randomBytes(32).toString("hex");
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
      token: verificationToken,
      expires,
    },
  });

  await sendVerificationEmail(email, verificationToken);

  return user;
}

export async function verifyEmail(token: string) {
  if (!token) {
    throw new Error("Verification token is required");
  }

  const verificationToken = await db.verificationToken.findFirst({
    where: {
      token: token,
      expires: {
        gt: new Date(),
      },
    },
  });



  if (!verificationToken) {
    throw new Error("Invalid or expired verification token");
  }

  try {
    
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
          token: token,
        },
      },
    });

 
  } catch (error) {
    console.error("Error during verification process:", error);
    throw new Error("Failed to verify email. Please try again or contact support.");
  }
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
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await db.verificationToken.create({
    data: {
      identifier: email,
      token: resetToken,
      expires,
    },
  });

  await sendPasswordResetEmail(email, resetToken);
}

export async function updatePassword(token: string, newPassword: string) {
  const verificationToken = await db.verificationToken.findFirst({
    where: {
      token: token,
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
        token: token,
      },
    },
  });
} 
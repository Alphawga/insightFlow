import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcrypt";
import { registerUserSchema } from "@/lib/dto";
import { createUser, resetPassword as resetPasswordUtil, updatePassword } from "@/lib/auth";

export const registerUser = publicProcedure
    .input(registerUserSchema)
    .mutation(async ({ input }) => {
        const { email, password, name } = input;
        try {
            const user = await createUser(email, password, name);
            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
        } catch (error) {
            if (error instanceof Error && error.message.includes("already exists")) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User already exists",
                });
            }
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create user",
            });
        }
    });

export const verifyEmail = publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input, ctx }) => {
        const { token } = input;

        const verificationTokens = await ctx.db.verificationToken.findMany({
            where: {
                expires: {
                    gt: new Date(),
                },
            },
        });

        const matchingToken = await Promise.all(
            verificationTokens.map(async (verificationToken) => {
                const isValid = await bcrypt.compare(token, verificationToken.token);
                return isValid ? verificationToken : null;
            })
        ).then((results) => results.find(Boolean));

        if (!matchingToken) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid or expired token",
            });
        }

        await ctx.db.user.update({
            where: {
                email: matchingToken.identifier,
            },
            data: {
                emailVerified: new Date(),
            },
        });

        await ctx.db.verificationToken.delete({
            where: {
                token: matchingToken.token,
            },
        });

        return { success: true };
    });

export const forgotPassword = publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
        await resetPasswordUtil(input.email);
        return { success: true };
    });

export const resetPassword = publicProcedure
    .input(z.object({
        token: z.string(),
        password: z.string().min(8),
    }))
    .mutation(async ({ input }) => {
        const { token, password } = input;
        await updatePassword(token, password);
        return { success: true };
    });
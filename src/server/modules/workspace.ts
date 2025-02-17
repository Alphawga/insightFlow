import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

export const create = publicProcedure
  .input(
    z.object({
      name: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      console.log("User ID", ctx.session?.user.id);
      // Create the workspace
      const workspace = await ctx.db.workspace.create({
        data: {
          name: input.name,
          users: {
            create: {
              userId: ctx.session?.user.id ?? '',
              role: 'OWNER',
            },
          },
        },
      });

      return workspace;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to create workspace',
      });
    }
  });

export const getUserWorkspace = publicProcedure.query(async ({ ctx }) => {
  const userWorkspace = await ctx.db.userWorkspace.findFirst({
    where: {
      userId: ctx.session?.user.id,
    },
    include: {
      workspace: {
        include: {
          adAccounts: true,
        },
      },
    },
  });

  if (!userWorkspace) {
    return null;
  }

  return userWorkspace;
}); 
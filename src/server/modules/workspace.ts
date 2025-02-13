import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure } from '../trpc';

export const create = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      // Create the workspace
      const workspace = await ctx.db.workspace.create({
        data: {
          name: input.name,
          users: {
            create: {
              userId: ctx.session.user.id,
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
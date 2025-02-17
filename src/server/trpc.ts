import { initTRPC, TRPCError } from '@trpc/server';
import { db } from '../lib/db';
import type { NextRequest } from 'next/server';
import superjson from 'superjson';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { authOptions } from '../lib/auth';

interface CreateContextOptions {
  req: NextRequest;
  session?: Session | null;
}

export const createTRPCContext = async ({ req }: CreateContextOptions) => {
  const session = await getServerSession(authOptions);
  
  return {
    db,
    req,
    session,
  };
};

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

/**
 * Middleware to verify user is authenticated
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      // Infers that the `session` is non-null
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed); 
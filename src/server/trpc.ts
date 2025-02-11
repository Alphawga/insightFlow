import { initTRPC } from '@trpc/server';
import { db } from '../lib/db';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import superjson from 'superjson';

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  return {
    db,
    ...opts,
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
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure; 
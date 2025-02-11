import { router } from '../trpc';
import * as auth from '../modules/auth';

export const appRouter = router({
  ...auth,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter; 
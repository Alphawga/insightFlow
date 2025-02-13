import { router } from '../trpc';
import * as auth from '../modules/auth';
import * as googleAds from '../modules/google-ads';

export const appRouter = router({
    ...auth,
    ...googleAds,

});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter; 
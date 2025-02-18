import { router } from '../trpc';
import * as auth from '../modules/auth';
import * as workspace from '../modules/workspace';
import * as googleAds from '../modules/google-ads';
import * as dashboard from '../modules/dashboard'
import * as campaigns from '../modules/campaigns'
import * as adGroups from '../modules/ad-groups'


export const appRouter = router({
    ...auth,
    ...workspace,
    ...googleAds,
    ...dashboard,
    ...campaigns,
    ...adGroups,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter; 
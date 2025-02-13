import { NextResponse } from 'next/server';
import { createTRPCContext } from '@/server/trpc';
import { appRouter } from '@/server/routers/_app';

export async function GET(request: Request) {
  try {
    // Get the authorization code from the URL
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?error=${error}`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?error=no_code`
      );
    }

    // Create tRPC context and caller
    const ctx = await createTRPCContext({ req: request as any });
    const caller = appRouter.createCaller(ctx);

    // Get workspace ID from session (stored during redirect)
    const workspaceId = url.searchParams.get('state') || '';

    // Connect the account
    await caller.connectAccount({
      workspaceId,
      code,
    });

    // Redirect back to onboarding with success
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?step=conversion`
    );
  } catch (error) {
    console.error('Google Ads callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?error=${encodeURIComponent(
        error instanceof Error ? error.message : 'Unknown error'
      )}`
    );
  }
} 
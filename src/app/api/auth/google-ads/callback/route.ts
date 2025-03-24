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
        `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?error=${encodeURIComponent(error)}`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?error=${encodeURIComponent('No authorization code received')}`
      );
    }

    console.log('code', code);
    // Create tRPC context and caller
    const ctx = await createTRPCContext({ req: request as any });
    const caller = appRouter.createCaller(ctx);

    // Get workspace ID from session (stored during redirect)
    const workspaceId = url.searchParams.get('state') || '';
    
    if (!workspaceId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?error=${encodeURIComponent('No workspace ID found')}`
      );
    }

    // Connect the account
    await caller.connectAccount({
      workspaceId,
      code,
      accountId: '',
      name: workspaceId,
    });

    // Redirect back to onboarding with a query parameter to refetch
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?callback=success`
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
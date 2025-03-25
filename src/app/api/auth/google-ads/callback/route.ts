import { NextResponse } from 'next/server';
import { createTRPCContext } from '@/server/trpc';
import { appRouter } from '@/server/routers/_app';
import { GoogleAdsClient } from '@/lib/utils/google-ads-client';

export async function GET(request: Request) {
  try {
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

    const ctx = await createTRPCContext({ req: request as any });
    const caller = appRouter.createCaller(ctx);

    const workspaceId = url.searchParams.get('state') || '';
    
    if (!workspaceId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/onboarding?error=${encodeURIComponent('No workspace ID found')}`
      );
    }

    try {
      await caller.connectAccount({
        workspaceId,
        code,
        name: `Google Ads Account`,
      });
    } catch (tokenError) {
      console.error('Token exchange error:', tokenError);
    }

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
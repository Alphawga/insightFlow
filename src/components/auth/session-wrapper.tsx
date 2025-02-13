'use client';

import { useSession } from 'next-auth/react';
import { usePathname, redirect } from 'next/navigation';

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth');

  if (status === 'loading') {
    return null; // or a loading spinner
  }

  if (!session && !isAuthPage) {
    redirect('/auth/login');
  }

  return <>{children}</>;
} 
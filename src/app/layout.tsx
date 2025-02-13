import '@/app/globals.css';
import { Inter } from 'next/font/google';
import TRPCProvider from '@/app/_providers/trpc-provider';
import { SessionProvider } from 'next-auth/react';
import SessionWrapper from '@/components/auth/session-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'InsightFlow Pro',
  description: 'Unified Analytics Dashboard for E-commerce',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <TRPCProvider>
            <SessionWrapper>{children}</SessionWrapper>
          </TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

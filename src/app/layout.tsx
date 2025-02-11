import '@/app/globals.css';
import { Inter } from 'next/font/google';
import TRPCProvider from '@/app/_providers/trpc-provider';

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
    <html lang="en" >
      <body className={inter.className}>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}

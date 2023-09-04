import React from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Big Reg Hunt',
  description: 'Guernsey based car registration searching game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <div className='flex min-h-screen w-full justify-center bg-slate-400 p-1'>
          {children}
        </div>
      </body>
    </html>
  );
}

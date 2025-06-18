import Head from 'next/head';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
};

export default function Layout({ title = 'Trebound × TravelPerk', children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen bg-background text-text">{children}</main>
      <footer className="text-center py-8 text-sm opacity-70">
        Crafted with ❤︎ by Trebound — Inspired by Apple design principles.
      </footer>
    </>
  );
} 
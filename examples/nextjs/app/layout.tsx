import type { Metadata } from 'next';
import type * as React from 'react';

export const metadata: Metadata = {
  title: 'ui-sucks Next.js Example',
  description: 'Headless React primitives rendered inside a Next.js app.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
          background:
            'linear-gradient(180deg, #f8f4eb 0%, #e9eef0 100%)',
          color: '#152127',
        }}
      >
        {children}
      </body>
    </html>
  );
}

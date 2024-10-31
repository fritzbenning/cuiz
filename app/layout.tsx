import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cuiz',
  description: 'cuiz next',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

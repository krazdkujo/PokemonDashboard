import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trainer Lookup Dashboard',
  description: 'Look up your Pokemon trainer data and see your selected starter Pokemon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  );
}

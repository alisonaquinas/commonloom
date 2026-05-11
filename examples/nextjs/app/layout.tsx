import '../src/styles.scss';

export const metadata = {
  title: 'Commonloom Next.js Example',
  description: 'Shared Commonloom content rendered through Next.js.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


import type {Metadata} from 'next';
import {Lato} from 'next/font/google';
import './globals.css';

const lato = Lato({
  weight: ['100', '300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'Solace Advocate Finder',
  description:
    'Find qualified healthcare advocates to support your medical journey. Search our network of professional Solace Advocates by specialty, location, and experience to connect with the right expert who can help navigate your healthcare needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={lato.variable}>{children}</body>
    </html>
  );
}

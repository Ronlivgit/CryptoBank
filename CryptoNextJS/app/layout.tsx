import type { Metadata } from "next";
import { Inter , IBM_Plex_Serif } from "next/font/google";
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable:  '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets : ['latin'],
  weight : ['400','700'],
  variable : '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "CryptoBank",
  description: "CryptoBank is a simulation of the future of banking with the usage of blockchain",
  icons : '/icons/logo.svg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ibmPlexSerif.variable}`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpintheQ - The Ultimate Decision Wheel",
  description: "Can't decide? Let SpintheQ choose for you. Create, share, and spin custom wheels for food, movies, games, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />

        {/* Monetag: Script 1 */}
        <Script
          src="https://3nbf4.com/act/files/tag.min.js?z=10441037"
          data-cfasync="false"
          async
          strategy="afterInteractive"
        />

        {/* Monetag: Script 2 */}
        <Script
          src="https://al5sm.com/tag.min.js"
          data-zone="10441041"
          strategy="afterInteractive"
        />


      </body>
    </html>
  );
}

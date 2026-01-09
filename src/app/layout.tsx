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


        {/* Monetag Ad: Multi-Tag */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="200487"
          async
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

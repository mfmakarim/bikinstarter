import CookieBanner from "@/components/cookie-banner";
import GoogleAnalytics from "@/components/google-analytics";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starter.bikinsaas.id/"),
  title: {
    default: "Template SaaS Next.js - BikinStarter",
    template: "%s | Template SaaS Next.js - BikinStarter",
  },
  description: "Template Next.js sederhana dan semua yang kamu butuhkan untuk bikin SaaS dalam hitungan minggu bukan bulan!",
  openGraph: {
    title: "Template SaaS Next.js - BikinStarter",
    description: "Template Next.js sederhana dan semua yang kamu butuhkan untuk bikin SaaS dalam hitungan minggu bukan bulan!",
    type: "website",
    locale: "id_ID",
    url: "https://starter.bikinsaas.id/",
    siteName: "BikinStarter",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id">
        <Suspense>
          <GoogleAnalytics />
        </Suspense>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main className="pt-16">
            {children}
          </main>
          <Toaster />
          <CookieBanner />
        </body>
      </html>
    </ClerkProvider>
  );
}

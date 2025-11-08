import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/common/theme/theme-provider";
import { WhatsappFloatingButton } from "@/common/layout/whatsapp-floating";
import { Analytics } from "@vercel/analytics/next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jkhealthcare.org";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JK Health Care AI - AI-Powered Healthcare in Kashmir",
  description:
    "Revolutionary AI-powered healthcare platform for Kashmir Valley. Find doctors, book appointments, get lab tests, and access emergency healthcare services with advanced AI assistance.",
  keywords: [
    "healthcare AI Kashmir",
    "AI doctor consultation",
    "medical services Kashmir",
    "healthcare technology",
    "AI health assistant",
    "medical AI platform",
    "healthcare innovation",
    "digital health Kashmir",
  ],
  icons: {
    icon: [{ url: "/Logo.jpg?v=2", type: "image/jpeg" }],
    shortcut: [{ url: "/Logo.jpg?v=2", type: "image/jpeg" }],
    apple: [{ url: "/Logo.jpg?v=2", type: "image/jpeg" }],
  },
  openGraph: {
    title: "JK Health Care AI - AI-Powered Healthcare in Kashmir",
    description:
      "Revolutionary AI-powered healthcare platform for Kashmir Valley. Find doctors, book appointments, get lab tests, and access emergency healthcare services.",
    type: "website",
    locale: "en_US",
    images: ["/Logo.jpg?v=2"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JK Health Care AI - AI-Powered Healthcare in Kashmir",
    description:
      "Revolutionary AI-powered healthcare platform for Kashmir Valley. Find doctors, book appointments, get lab tests, and access emergency healthcare services.",
    images: ["/Logo.jpg?v=2"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <WhatsappFloatingButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

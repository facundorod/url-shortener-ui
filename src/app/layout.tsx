import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "URL Shortener - Create Short Links Instantly",
    template: "%s | URL Shortener"
  },
  description: "Fast, reliable URL shortener service. Create short links, track clicks, and manage your URLs with ease. Perfect for social media, marketing, and sharing.",
  keywords: [
    "URL shortener",
    "short links",
    "link shortener",
    "tiny URL",
    "link management",
    "click tracking",
    "social media links",
    "marketing links"
  ],
  authors: [{ name: "URL Shortener Team" }],
  creator: "URL Shortener",
  publisher: "URL Shortener",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "URL Shortener - Create Short Links Instantly",
    description: "Fast, reliable URL shortener service. Create short links, track clicks, and manage your URLs with ease.",
    url: '/',
    siteName: 'URL Shortener',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URL Shortener - Create Short Links Instantly',
    description: 'Fast, reliable URL shortener service. Create short links, track clicks, and manage your URLs with ease.',
    creator: '@urlshortener',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="URL Shortener" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="URL Shortener" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-1">
            {children}
          </main>
          
          
        </div>
      </body>
    </html>
  );
}

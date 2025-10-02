import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";


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
    default: "Next.js Test App - Демонстрация типов рендеринга",
    template: "%s | Next.js Test App"
  },
  description: "Демонстрационное приложение, показывающее различные методы рендеринга в Next.js: SSG, SSR, ISR, CSR. Включает работу с API, WebSocket, модальными окнами и различными подходами к стилизации.",
  keywords: ["Next.js", "React", "TypeScript", "SSG", "SSR", "ISR", "CSR", "WebSocket", "Tailwind CSS"],
  authors: [{ name: "Frontend Developer" }],
  creator: "Frontend Developer",
  publisher: "Next.js Test App",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Next.js Test App - Демонстрация типов рендеринга",
    description: "Профессиональное демо приложение с SSG, SSR, ISR, CSR, WebSocket и различными подходами к стилизации",
    type: "website",
    locale: "ru_RU",
    siteName: "Next.js Test App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Test App",
    description: "Демонстрация различных методов рендеринга в Next.js",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}

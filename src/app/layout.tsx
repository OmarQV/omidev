import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import '@fontsource-variable/inter'
import './globals.css'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { LanguageProvider } from '@/i18n'

/**
 * src/app/layout.tsx — global shell.
 * Fonts: Inter Variable (@fontsource, self-hosted) for editorial
 * headlines/body; Geist Mono (geist package) for technical labels.
 * Both ship from npm — zero external font requests, zero CLS.
 * Lenis wraps the app for inertia-based smooth scrolling.
 */

export const metadata: Metadata = {
  metadataBase: new URL('https://omidev.vercel.app'),
  title: {
    default: 'Omar Quispe Vargas — Engineer · Security · Web3 · VC',
    template: '%s — OMIDEV',
  },
  description:
    'Creative engineer operating across software, offensive security, blockchain protocols and venture strategy. Minimal. Monochrome. Measured in shipped systems.',
  keywords: [
    'software engineer',
    'cybersecurity',
    'blockchain',
    'smart contract audit',
    'web3',
    'venture capital',
    'creative developer',
  ],
  authors: [{ name: 'Omar Quispe Vargas', url: 'https://github.com/OmarQV' }],
  creator: 'Omar Quispe Vargas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    siteName: 'OMIDEV',
    title: 'Omar Quispe Vargas — Engineer · Security · Web3 · VC',
    description:
      'Security is architecture, not an afterthought — from smart contracts to the business model behind them.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omar Quispe Vargas — OMIDEV',
    description: 'Software · Security · Web3 · Venture Capital',
    creator: '@OmarQV2025',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="min-h-dvh bg-background text-foreground-soft antialiased">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://innholdsprodusentene.no'
const SITE_NAME = 'Innholdsprodusentene'
const SITE_DESCRIPTION =
  'Innholdsprodusentene – artikler, innsikt og ressurser for norske innholdsskapere.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: SITE_URL,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className={inter.variable}>
      <body className="bg-white font-sans">
        <header className="border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Innholdsprodusentene
            </Link>
            <nav aria-label="Hovednav">
              <ul className="flex gap-6 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-gray-900 transition-colors">
                    Artikler
                  </Link>
                </li>
                <li>
                  <Link href="/om" className="hover:text-gray-900 transition-colors">
                    Om
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-gray-100 mt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Innholdsprodusentene</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://innholdsprodusentene.no'

export const metadata: Metadata = {
  title: 'Om',
  description:
    'Innholdsprodusentene er et nettsted med artikler og ressurser for norske innholdsskapere.',
  alternates: { canonical: `${SITE_URL}/om` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/om`,
    title: 'Om | Innholdsprodusentene',
    description:
      'Innholdsprodusentene er et nettsted med artikler og ressurser for norske innholdsskapere.',
  },
}

export default function OmPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Om Innholdsprodusentene</h1>
      </header>

      <div className="prose prose-gray max-w-none">
        <p>
          <strong>Innholdsprodusentene</strong> er et norsk nettsted for deg som jobber med
          innholdsproduksjon – enten som frilanser, ansatt i en bedrift, eller som gründer som
          bygger en merkevare gjennom innhold.
        </p>

        <p>
          Her publiserer vi artikler om skriftlig innholdsproduksjon, AI-verktøy, SEO og
          strategisk kommunikasjon. Målet er å gi deg praktisk kunnskap du kan bruke med en
          gang.
        </p>

        <h2>Hvem skriver her?</h2>
        <p>
          Innholdet produseres av norske fagpersoner med erfaring fra redaksjon, markedsføring
          og digital kommunikasjon. Vi legger vekt på at artiklene skal være grundige,
          faktabaserte og oppdaterte.
        </p>

        <h2>Kontakt</h2>
        <p>
          Har du spørsmål, innspill eller ønsker å bidra med en artikkel? Send oss en e-post
          på{' '}
          <a href="mailto:hei@innholdsprodusentene.no">hei@innholdsprodusentene.no</a>.
        </p>
      </div>
    </section>
  )
}

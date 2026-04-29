import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/articles'
import { ArticleCard } from '@/components/ArticleCard'

export const metadata: Metadata = {
  title: 'Artikler',
  description: 'Les siste artikler om innholdsproduksjon, AI-verktøy og kreative prosesser.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const articles = getAllArticles()

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Artikler</h1>
        <p className="text-gray-500 text-lg">
          Innsikt og ressurser for norske innholdsskapere.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="text-gray-400">Ingen artikler publisert ennå.</p>
      ) : (
        <div>
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              frontmatter={article.frontmatter}
            />
          ))}
        </div>
      )}
    </section>
  )
}

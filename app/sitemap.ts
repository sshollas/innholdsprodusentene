import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://innholdsprodusentene.no'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/artikler/${article.slug}`,
    lastModified: new Date(article.frontmatter.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/om`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...articleEntries,
  ]
}

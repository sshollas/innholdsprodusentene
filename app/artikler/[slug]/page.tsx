import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ChatBubble, ChatThread } from '@/components/ChatBubble'
import { getAllArticles, getArticle, getArticleSlugs, formatDate } from '@/lib/articles'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://innholdsprodusentene.no'
const SITE_NAME = 'Innholdsprodusentene'

const mdxComponents = { ChatBubble, ChatThread }

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const slugs = getArticleSlugs()
  if (!slugs.includes(slug)) return {}

  const { frontmatter } = getArticle(slug)
  const canonicalUrl = `${SITE_URL}/artikler/${slug}`
  const imageUrl = frontmatter.coverImage
    ? `${SITE_URL}${frontmatter.coverImage}`
    : `${SITE_URL}/og-default.png`

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: frontmatter.author }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [imageUrl],
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const slugs = getArticleSlugs()
  if (!slugs.includes(slug)) notFound()

  const { frontmatter, content } = getArticle(slug)
  const canonicalUrl = `${SITE_URL}/artikler/${slug}`
  const imageUrl = frontmatter.coverImage
    ? `${SITE_URL}${frontmatter.coverImage}`
    : `${SITE_URL}/og-default.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: imageUrl,
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: frontmatter.tags.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <header className="mb-10">
          {frontmatter.tags.length > 0 && (
            <div className="flex gap-2 mb-4">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed mb-6">{frontmatter.description}</p>

          <div className="flex items-center gap-2 text-sm text-gray-400 border-t border-gray-100 pt-4">
            <span className="font-medium text-gray-600">{frontmatter.author}</span>
            <span>·</span>
            <time dateTime={frontmatter.publishedAt}>{formatDate(frontmatter.publishedAt)}</time>
            {frontmatter.updatedAt !== frontmatter.publishedAt && (
              <>
                <span>·</span>
                <span>Oppdatert {formatDate(frontmatter.updatedAt)}</span>
              </>
            )}
          </div>
        </header>

        {frontmatter.coverImage && (
          <img
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            className="w-full rounded-xl mb-10 aspect-[2/1] object-cover"
          />
        )}

        <div className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-lg">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            Skrevet av{' '}
            <span className="font-medium text-gray-600">{frontmatter.author}</span>
          </p>
        </footer>
      </article>
    </>
  )
}

import Link from 'next/link'
import { formatDate, type ArticleFrontmatter } from '@/lib/articles'

interface ArticleCardProps {
  slug: string
  frontmatter: ArticleFrontmatter
}

export function ArticleCard({ slug, frontmatter }: ArticleCardProps) {
  return (
    <article className="group py-8 border-b border-gray-100 last:border-0">
      <Link href={`/artikler/${slug}`} className="block">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
          {frontmatter.title}
        </h2>
        <p className="text-gray-600 leading-relaxed mb-3">{frontmatter.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{frontmatter.author}</span>
          <span>·</span>
          <time dateTime={frontmatter.publishedAt}>{formatDate(frontmatter.publishedAt)}</time>
          {frontmatter.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </Link>
    </article>
  )
}

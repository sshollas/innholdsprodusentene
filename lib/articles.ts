import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ArticleFrontmatter {
  title: string
  description: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  coverImage?: string
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
}

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'artikler')

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getArticle(slug: string): Article {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  }
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticle(slug))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.publishedAt).getTime() -
        new Date(a.frontmatter.publishedAt).getTime()
    )
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  serverExternalPackages: ['gray-matter'],
}

export default nextConfig

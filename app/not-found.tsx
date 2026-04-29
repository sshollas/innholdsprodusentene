import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-32 text-center">
      <h1 className="text-5xl font-bold text-gray-200 mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-8">Siden finnes ikke.</p>
      <Link
        href="/"
        className="inline-block text-sm text-blue-600 hover:text-blue-700 underline underline-offset-4 transition-colors"
      >
        ← Tilbake til forsiden
      </Link>
    </section>
  )
}

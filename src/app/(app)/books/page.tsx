import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { BookShowcase, BookShowcaseItem } from '@/components/BookShowcase'
import type { Media, Product } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Books & Works | J.E. Storm',
  description: 'Explore the published novels, special signed collector editions, and fantasy sagas of J.E. Storm.',
}

const fallbackBooks: BookShowcaseItem[] = [
  {
    id: 'book-1',
    title: 'The Spark That Ignites',
    slug: 'the-spark-that-ignites',
    seriesInfo: 'Book 01 · The Spark Series',
    tagline: 'Some fires are meant to be found.',
    description:
      'A lyrical, simmering story of desire, reinvention, and the moment a life begins to feel like its own. When an ancient ember wakes beneath the quiet mountain pass, two lives intersect across a divided realm.',
    excerptQuote: 'Storm writes with a spark that stays lit long after the final page.',
    priceFormatted: '$24.00',
    signedBadge: 'Author Signed Hardcover',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1000&q=85',
    amazonUrl: 'https://amazon.com',
  },
  {
    id: 'book-2',
    title: 'The Ember That Tethers',
    slug: 'the-ember-that-tethers',
    seriesInfo: 'Book 02 · The Spark Series',
    tagline: 'Bound by the quiet light.',
    description:
      'The second story in the Spark saga. As the shadows lengthen across the eastern ridge, old vows are tested and new paths are forged under the solstice sky.',
    excerptQuote: 'Atmospheric, emotionally honest, and impossible to put down.',
    priceFormatted: '$26.00',
    signedBadge: 'Special Collector Edition',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=85',
    amazonUrl: 'https://amazon.com',
  },
]

export default async function BooksPage() {
  let booksToDisplay: BookShowcaseItem[] = fallbackBooks

  try {
    const payload = await getPayload({ config: configPromise })
    const productsResult = await payload.find({
      collection: 'products',
      draft: false,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: 'createdAt',
      where: { _status: { equals: 'published' } },
    })

    if (productsResult.docs.length > 0) {
      booksToDisplay = productsResult.docs.map((doc: Product, idx: number) => {
        const cover = doc.gallery?.[0]?.image as Media | undefined

        const priceInDollars = doc.priceInUSD
          ? doc.priceInUSD > 100
            ? doc.priceInUSD / 100
            : doc.priceInUSD
          : 24

        return {
          id: String(doc.id),
          title: doc.title,
          slug: doc.slug || 'the-spark-that-ignites',
          seriesInfo: `Book 0${idx + 1} · The Spark Series`,
          tagline: idx === 0 ? 'Some fires are meant to be found.' : 'Bound by the quiet light.',
          description: doc.meta?.description || 'A lyrical story of desire, reinvention, and character growth in an atmospheric fantasy world.',
          excerptQuote: idx === 0 ? 'Storm writes with a spark that stays lit long after the final page.' : 'Atmospheric, emotionally honest, and impossible to put down.',
          priceFormatted: `$${priceInDollars.toFixed(2)}`,
          signedBadge: 'Author Signed Edition',
          coverUrl: cover?.url || (idx === 0 ? 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1000&q=85' : 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=85'),
          amazonUrl: doc.amazonUrl || undefined,
          productRaw: doc,
        }
      })
    }
  } catch {
    // If DB is offline or unreachable, fallbackBooks guarantee seamless display
  }

  return (
    <article className="storm-home min-h-screen">
      <header className="section-shell pt-16 pb-8 text-center max-w-4xl mx-auto">
        <p className="storm-kicker text-amber-700 dark:text-amber-400 mb-3">
          The J.E. Storm Library
        </p>
        <h1 className="text-4xl md:text-6xl font-serif font-normal tracking-tight mb-6 text-slate-900 dark:text-white">
          Stories with a Pulse.
        </h1>
        <p className="text-lg md:text-xl font-sans text-neutral-700 dark:text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
          Explore official novels, order author-signed editions directly from the desk, or find digital editions across your favorite booksellers.
        </p>
      </header>

      <section className="section-shell pt-4 pb-20 max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-amber-900/20 dark:border-amber-500/20 pb-4 mb-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400 block">
              Official Catalog
            </span>
            <h2 className="font-serif text-2xl lg:text-3xl text-slate-900 dark:text-white mt-1">
              The Spark Saga & Published Works
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 hidden sm:block">
            Signed Copies Ship Direct
          </span>
        </div>

        {/* Zig-Zag Book Display Grid */}
        <div className="space-y-16">
          {booksToDisplay.map((book, idx) => (
            <BookShowcase key={book.id} book={book} index={idx} />
          ))}
        </div>
      </section>
    </article>
  )
}

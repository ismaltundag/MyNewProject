import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Reviews | J.E. Storm',
  description: 'Reader reviews and editorial praise for J.E. Storm books.',
}

const fallbackReviews = [
  {
    quote: 'A fierce, tender story about the courage it takes to become yourself.',
    source: 'Goodreads reader',
  },
  {
    quote: 'Storm writes with a spark that stays lit long after the final page.',
    source: 'Early reader review',
  },
  {
    quote: 'Beautifully atmospheric, emotionally honest, and impossible to put down.',
    source: 'Goodreads reader',
  },
]

export default async function ReviewsPage() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'reviews',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'order',
    where: {
      _status: { equals: 'published' },
    },
  })

  const reviews = result.docs.length > 0 ? result.docs : fallbackReviews

  return (
    <article className="storm-list-page">
      <header className="storm-list-hero">
        <p className="storm-kicker">From the readers</p>
        <h1>Kind words from the other side of the page.</h1>
        <p>Reviews, editorial praise, and reactions from readers across the world.</p>
      </header>
      <section className="storm-review-list storm-list-content section-shell">
        {reviews.map((review, idx) => (
          <blockquote key={'id' in review ? (review.id as string) : idx}>
            <span className="storm-quote-mark">“</span>
            <p>{review.quote}</p>
            <cite>{review.source}</cite>
          </blockquote>
        ))}
      </section>
    </article>
  )
}

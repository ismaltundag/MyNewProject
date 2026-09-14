import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { UpcomingRelease } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Releases | J.E. Storm',
  description: 'New and upcoming releases from J.E. Storm.',
}

export default async function ReleasesPage() {
  const payload = await getPayload({ config: configPromise })

  let upcomingRelease: UpcomingRelease | null = null
  try {
    upcomingRelease = await payload.findGlobal({ slug: 'upcoming-release' })
  } catch {
    // fallback if unseeded
  }

  const kicker = upcomingRelease?.kicker || 'Coming September 14'
  const bookTitle = upcomingRelease?.bookTitle || 'The Ember That Tethers'
  const headline = upcomingRelease?.headline || 'Some embers are meant to endure.'
  const seriesLabel = upcomingRelease?.seriesLabel || 'Book two'
  const description =
    upcomingRelease?.description ||
    'Return to the world of J.E. Storm with a new story about what we hold onto, and what finally sets us free.'
  const ctaText = upcomingRelease?.ctaText || 'Join the release list'
  const ctaUrl = upcomingRelease?.ctaUrl || '/#join-the-storm'

  return (
    <article className="storm-list-page">
      <header className="storm-list-hero">
        <p className="storm-kicker">{kicker}</p>
        <h1>{bookTitle}</h1>
        <p>
          The next story is almost here. Follow along for launch news, signed editions, and first
          access.
        </p>
      </header>
      <section className="storm-release storm-release-page section-shell">
        <div>
          <p className="storm-kicker">{seriesLabel}</p>
          <h2>{headline}</h2>
          <p>{description}</p>
          <Link className="storm-button storm-button-dark" href={ctaUrl}>
            {ctaText}
          </Link>
        </div>
        <div className="storm-book storm-book-release">
          <span className="storm-book-label">{seriesLabel}</span>
          <strong>{bookTitle}</strong>
          <span className="storm-book-author">J.E. Storm</span>
        </div>
      </section>
    </article>
  )
}

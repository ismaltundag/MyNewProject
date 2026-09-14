import Link from 'next/link'

import { NewsletterSignup } from '@/components/NewsletterSignup'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Homepage, Media, Product, UpcomingRelease } from '@/payload-types'

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

export async function StormHome() {
  let events = { docs: [] as any[] }
  let journalResult = { docs: [] as any[] }
  let reviewsResult = { docs: [] as any[] }
  let audiobooksResult = { docs: [] as any[] }
  let homepage: Homepage | null = null
  let upcomingRelease: UpcomingRelease | null = null
  let productsResult = { docs: [] as any[] }

  try {
    const payload = await getPayload({ config: configPromise })

    try {
      events = await payload.find({
        collection: 'events',
        depth: 0,
        limit: 3,
        overrideAccess: false,
        sort: 'date',
        where: {
          and: [
            { _status: { equals: 'published' } },
            { date: { greater_than_equal: new Date().toISOString() } },
          ],
        },
      })
    } catch {
      // fallback
    }

    try {
      journalResult = await payload.find({
        collection: 'journal',
        depth: 1,
        limit: 3,
        overrideAccess: false,
        sort: '-publishedAt',
        where: {
          _status: { equals: 'published' },
        },
      })
    } catch {
      // fallback
    }

    try {
      reviewsResult = await payload.find({
        collection: 'reviews',
        depth: 0,
        limit: 3,
        overrideAccess: false,
        sort: 'order',
        where: {
          and: [
            { _status: { equals: 'published' } },
            { featuredOnHome: { equals: true } },
          ],
        },
      })
    } catch {
      // fallback
    }

    try {
      audiobooksResult = await payload.find({
        collection: 'audiobooks',
        depth: 1,
        limit: 3,
        overrideAccess: false,
        sort: 'order',
        where: { _status: { equals: 'published' } },
      })
    } catch {
      // fallback
    }

    try {
      homepage = await payload.findGlobal({ slug: 'homepage' })
    } catch {
      // fallback
    }

    try {
      upcomingRelease = await payload.findGlobal({ slug: 'upcoming-release' })
    } catch {
      // fallback
    }

    try {
      productsResult = await payload.find({
        collection: 'products',
        depth: 1,
        limit: 1,
        overrideAccess: false,
        where: {
          _status: { equals: 'published' },
        },
      })
    } catch {
      // fallback
    }
  } catch {
    // Outer fallback if payload cannot initialize
  }

  const reviews = reviewsResult.docs.length > 0 ? reviewsResult.docs : fallbackReviews
  const featuredProduct: Product | undefined =
    (typeof homepage?.featuredProduct === 'object' ? (homepage.featuredProduct as Product) : undefined) ||
    productsResult.docs?.[0]

  const customFeaturedImage = homepage?.customImage as Media | undefined
  const productFeaturedImage = featuredProduct?.gallery?.[0]?.image as Media | undefined
  const featuredImage = customFeaturedImage || productFeaturedImage

  const heroKicker = homepage?.heroKicker || 'J.E. Storm · Author & storyteller'
  const heroHeadline = homepage?.heroHeadline || 'Stories with a pulse.'
  const heroIntro =
    homepage?.heroIntro ||
    'Come closer. These are books about the heat beneath the quiet, the people who change us, and the spark that refuses to go out.'
  const heroButtonText = homepage?.heroButtonText || 'Explore the books'
  const heroButtonLink = homepage?.heroButtonLink || '/books'
  const heroSecondaryText = homepage?.heroSecondaryText || 'Meet J.E. Storm'
  const heroSecondaryLink = homepage?.heroSecondaryLink || '/about'

  const sectionKicker = homepage?.sectionKicker || 'Featured book'
  const sectionHeading = homepage?.sectionHeading || 'The beginning of everything.'
  const bookTitle = homepage?.customTitle || featuredProduct?.title || 'The Spark That Ignites'
  const bookTagline = homepage?.tagline || 'Some fires are meant to be found.'
  const bookDescription =
    homepage?.description ||
    'A lyrical, simmering story of desire, reinvention, and the moment a life begins to feel like its own. Find the first book in the series, signed by J.E. Storm.'
  const rawPriceInDollars = featuredProduct?.priceInUSD
    ? featuredProduct.priceInUSD > 100
      ? featuredProduct.priceInUSD / 100
      : featuredProduct.priceInUSD
    : 24
  const bookPrice = homepage?.customPrice || `$${rawPriceInDollars.toFixed(2)}`
  const bookBadge = homepage?.badge || 'Hardcover · Signed'
  const bookButtonText = homepage?.buttonText || 'Shop the signed edition'
  const bookButtonUrl =
    homepage?.buttonUrl ||
    (featuredProduct?.slug ? `/products/${featuredProduct.slug}` : '/products/the-spark-that-ignites')

  const newsletterKicker = homepage?.newsletterKicker || 'Join the Storm'
  const newsletterHeading = homepage?.newsletterHeading || 'Stay close to the spark.'
  const newsletterDescription =
    homepage?.newsletterDescription ||
    'New books, event invitations, signed-copy drops, and occasional notes from the desk.'

  return (
    <div className="storm-home">
      <section className="storm-hero">
        <div className="storm-hero-copy">
          <p className="storm-kicker">{heroKicker}</p>
          <h1>{heroHeadline}</h1>
          <p className="storm-hero-intro">{heroIntro}</p>
          <div className="storm-actions">
            <Link className="storm-button storm-button-dark" href={heroButtonLink}>
              {heroButtonText}
            </Link>
            <Link className="storm-text-link" href={heroSecondaryLink}>
              {heroSecondaryText} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div
          className="storm-hero-art"
          aria-label="A reader's desk with a featured book"
          role="img"
        >
          <div className="storm-sun" />
          <div className="storm-book storm-book-hero">
            <span className="storm-book-label">A novel</span>
            <strong>
              {bookTitle.includes(' ') ? (
                <>
                  {bookTitle.split(' ').slice(0, 2).join(' ')}
                  <br />
                  {bookTitle.split(' ').slice(2).join(' ')}
                </>
              ) : (
                bookTitle
              )}
            </strong>
            <span className="storm-book-author">J.E. Storm</span>
          </div>
          <p className="storm-art-note">{bookTitle} · Book one</p>
        </div>
      </section>

      {/* Featured Book Spotlight */}
      <section className="storm-feature section-shell">
        <div className="storm-section-heading">
          <p className="storm-kicker">{sectionKicker}</p>
          <h2>{sectionHeading}</h2>
        </div>
        <div className="storm-feature-grid">
          <div className="storm-feature-image">
            <img
              src={
                featuredImage?.url ||
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1000&q=85'
              }
              alt={featuredImage?.alt || bookTitle}
            />
            <span className="storm-image-caption">Signed copies available</span>
          </div>
          <div className="storm-feature-copy">
            <p className="storm-eyebrow">{bookTitle}</p>
            <h3>{bookTagline}</h3>
            <p>{bookDescription}</p>
            <div className="storm-price-row">
              <span>{bookPrice}</span>
              <span className="storm-muted">{bookBadge}</span>
            </div>
            <Link className="storm-button storm-button-outline" href={bookButtonUrl}>
              {bookButtonText}
            </Link>
          </div>
        </div>
      </section>

      {audiobooksResult.docs.length ? (
        <section className="storm-audiobooks section-shell">
          <div className="storm-section-heading storm-heading-row">
            <div>
              <p className="storm-kicker">Listen anywhere</p>
              <h2>Stories to listen to.</h2>
            </div>
            <Link className="storm-text-link" href="/audiobooks">
              All audiobooks <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="storm-audiobooks-grid">
            {audiobooksResult.docs.map((audiobook) => {
              const cover = typeof audiobook.coverImage === 'object' ? audiobook.coverImage : null

              return (
                <article className="storm-audiobook-card" key={audiobook.id}>
                  {cover?.url ? (
                    <img alt={cover.alt || audiobook.title} src={cover.url} />
                  ) : (
                    <div aria-hidden className="storm-audiobook-card-cover" />
                  )}
                  <div>
                    <h3>{audiobook.title}</h3>
                    {audiobook.description ? <p>{audiobook.description}</p> : null}
                    <a
                      className="storm-text-link"
                      href={audiobook.spotifyUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Listen on Spotify <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ) : null}

      {/* Reader Praise & Reviews */}
      <section className="storm-reviews">
        <div className="section-shell">
          <div className="storm-review-intro">
            <p className="storm-kicker">From the readers</p>
            <h2>Kind words from the other side of the page.</h2>
            <Link className="storm-text-link" href="/reviews">
              Read all reviews <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="storm-review-list">
            {reviews.map((review, idx) => (
              <blockquote key={'id' in review ? (review.id as string) : idx}>
                <span className="storm-quote-mark">“</span>
                <p>{review.quote}</p>
                <cite>{review.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Release Spotlight */}
      <section className="storm-release section-shell">
        <div className="storm-release-copy">
          <p className="storm-kicker">
            {upcomingRelease?.kicker || 'Coming September 14'}
          </p>
          <h2>{upcomingRelease?.bookTitle || 'The Ember That Tethers'}</h2>
          <p>
            {upcomingRelease?.description ||
              'The second story is almost here. Join the list for first access, launch news, and a little something special for the early readers.'}
          </p>
          <Link
            className="storm-button storm-button-dark"
            href={upcomingRelease?.ctaUrl || '/releases'}
          >
            {upcomingRelease?.ctaText || 'Discover the next release'}
          </Link>
        </div>
        <div className="storm-book storm-book-release">
          <span className="storm-book-label">
            {upcomingRelease?.seriesLabel || 'Coming soon'}
          </span>
          <strong>
            {upcomingRelease?.bookTitle || (
              <>
                The Ember
                <br />
                That Tethers
              </>
            )}
          </strong>
          <span className="storm-book-author">J.E. Storm</span>
        </div>
      </section>

      {/* Events Section */}
      <section className="storm-events section-shell">
        <div className="storm-section-heading storm-heading-row">
          <div>
            <p className="storm-kicker">On the road</p>
            <h2>Meet me in the real world.</h2>
          </div>
          <Link className="storm-text-link" href="/events">
            All events <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="storm-event-list">
          {events.docs.length > 0 ? (
            events.docs.map((event) => (
              <div className="storm-event" key={event.id}>
                <span className="storm-event-date">
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
                <Link href={`/events#event-${event.id}`}>
                  <strong>{event.title}</strong>
                  <small>{event.location}</small>
                </Link>
                {event.registrationUrl ? (
                  <a
                    aria-label={`Register for ${event.title}`}
                    className="storm-event-arrow"
                    href={event.registrationUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    ↗
                  </a>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-500 py-4">
              Tour dates and signings will be announced soon.
            </p>
          )}
        </div>
      </section>

      {/* Dynamic Journal Section */}
      <section className="storm-journal section-shell">
        <div className="storm-section-heading storm-heading-row">
          <div>
            <p className="storm-kicker">From the journal</p>
            <h2>Notes from the margins.</h2>
          </div>
          <Link className="storm-text-link" href="/journal">
            Visit the journal <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="storm-journal-grid">
          {journalResult.docs.length > 0 ? (
            journalResult.docs.map((entry) => (
              <article key={entry.id}>
                <span>{entry.category || 'Journal'}</span>
                <h3>{entry.title}</h3>
                <Link href={`/journal/${entry.slug}`}>Read entry ↗</Link>
              </article>
            ))
          ) : (
            <>
              <article>
                <span>01 · Behind the books</span>
                <h3>What stays with us after the story ends</h3>
                <Link href="/journal">Read entry ↗</Link>
              </article>
              <article>
                <span>02 · The writing life</span>
                <h3>A room of one&apos;s own, with better coffee</h3>
                <Link href="/journal">Read entry ↗</Link>
              </article>
              <article>
                <span>03 · Reader notes</span>
                <h3>On finding your way back to the page</h3>
                <Link href="/journal">Read entry ↗</Link>
              </article>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="storm-newsletter" id="join-the-storm">
        <div className="section-shell storm-newsletter-inner">
          <p className="storm-kicker">{newsletterKicker}</p>
          <h2>{newsletterHeading}</h2>
          <p>{newsletterDescription}</p>
          <NewsletterSignup />
        </div>
      </section>
    </div>
  )
}

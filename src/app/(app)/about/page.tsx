import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { About, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'About J.E. Storm',
  description: 'Learn more about J.E. Storm, author of The Spark That Ignites.',
}

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise })

  let about: About | null = null
  try {
    about = await payload.findGlobal({ slug: 'about' })
  } catch {
    // fallback if unseeded
  }

  const authorPhoto = about?.authorPhoto as Media | undefined

  return (
    <article className="storm-about">
      <section className="storm-about-hero">
        <div className="storm-about-copy">
          <p className="storm-kicker">{about?.heroKicker || 'About J.E. Storm'}</p>
          <h1>{about?.heroTitle || 'Writing toward the light.'}</h1>
          <p>
            {about?.heroBio ||
              'J.E. Storm writes stories about becoming, belonging, and the quiet moments that change the course of a life.'}
          </p>
        </div>
        <div className="storm-about-image">
          <img
            src={
              authorPhoto?.url ||
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85'
            }
            alt={authorPhoto?.alt || 'Portrait of J.E. Storm'}
          />
        </div>
      </section>

      <section className="storm-about-story section-shell">
        <p className="storm-kicker">
          {about?.storyKicker || 'The story behind the stories'}
        </p>
        <div>
          <h2>
            {about?.storyHeading ||
              'Every book begins with a question that will not let go.'}
          </h2>
          <p>
            {about?.storyBody ||
              'When she is not writing, J.E. Storm is collecting overheard conversations, walking too far for coffee, and making room for the next idea. Her work is rooted in emotional honesty, warm atmosphere, and characters who refuse to stay where they started.'}
          </p>
          <p>
            <Link className="storm-text-link" href="/shop">
              Explore the books <span aria-hidden="true">↗</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="storm-about-join">
        <p className="storm-kicker">Keep in touch</p>
        <h2>Come closer to the story.</h2>
        <Link className="storm-button storm-button-dark" href="/#join-the-storm">
          Join the Storm
        </Link>
      </section>
    </article>
  )
}

import type { Metadata } from 'next'

import { Media } from '@/components/Media'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media as MediaType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Audiobooks | J.E. Storm',
  description: 'Listen to J.E. Storm audiobooks on Spotify.',
}

export default async function AudiobooksPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'audiobooks',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: 'order',
    where: { _status: { equals: 'published' } },
  })

  return (
    <article className="storm-list-page">
      <header className="storm-list-hero">
        <p className="storm-kicker">Listen anywhere</p>
        <h1>Stories to listen to.</h1>
        <p>Find J.E. Storm audiobooks on Spotify and press play whenever the story calls.</p>
      </header>
      <section className="storm-list-content section-shell">
        <p className="storm-kicker">Audiobooks</p>
        {result.docs.length ? (
          <div className="storm-audiobook-list">
            {result.docs.map((audiobook) => {
              const cover = typeof audiobook.coverImage === 'object' ? audiobook.coverImage : null

              return (
                <article className="storm-audiobook" key={audiobook.id}>
                  {cover ? (
                    <Media
                      className="storm-audiobook-image"
                      imgClassName="object-cover"
                      resource={cover as MediaType}
                    />
                  ) : (
                    <div aria-hidden className="storm-audiobook-cover" />
                  )}
                  <div>
                    <h2>{audiobook.title}</h2>
                    {audiobook.description ? <p>{audiobook.description}</p> : null}
                    <a
                      className="storm-button storm-button-dark"
                      href={audiobook.spotifyUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Listen on Spotify ↗
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <p className="storm-empty-state">Audiobooks will appear here once they are published.</p>
        )}
      </section>
    </article>
  )
}

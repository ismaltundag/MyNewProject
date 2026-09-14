import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const metadata: Metadata = {
  title: 'Events | J.E. Storm',
  description: 'Meet J.E. Storm at an upcoming event.',
}

export default async function EventsPage() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'events',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'date',
    where: {
      and: [
        { _status: { equals: 'published' } },
        { date: { greater_than_equal: new Date().toISOString() } },
      ],
    },
  })

  return (
    <article className="storm-list-page">
      <header className="storm-list-hero">
        <p className="storm-kicker">On the road</p>
        <h1>Meet me in the real world.</h1>
        <p>Book signings, conversations, and places to gather around a good story.</p>
      </header>
      <section className="storm-list-content section-shell">
        <p className="storm-kicker">Upcoming events</p>
        <div className="storm-event-list">
          {result.docs.map((event) => (
            <div className="storm-event" id={`event-${event.id}`} key={event.id}>
              <span className="storm-event-date">
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
              <span>
                <strong>{event.title}</strong>
                <small>{event.location}</small>
              </span>
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
          ))}
        </div>
      </section>
    </article>
  )
}

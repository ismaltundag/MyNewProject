import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Journal, Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Journal | J.E. Storm',
  description: 'Notes from the writing life, behind the scenes, and updates from J.E. Storm.',
}

export default async function JournalPage() {
  const payload = await getPayload({ config: configPromise })

  const journalEntries = await payload.find({
    collection: 'journal',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <article className="storm-list-page">
      <header className="storm-list-hero">
        <p className="storm-kicker">From the journal</p>
        <h1>Notes from the margins.</h1>
        <p>Behind the books, the writing life, and the small observations that become stories.</p>
      </header>
      <section className="storm-list-content section-shell">
        <p className="storm-kicker">All entries</p>
        {journalEntries.docs.length > 0 ? (
          <div className="storm-journal-grid">
            {journalEntries.docs.map((entry) => {
              const cover = entry.coverImage as Media | undefined
              const formattedDate = entry.publishedAt
                ? new Date(entry.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : null

              return (
                <article className="group relative flex flex-col justify-between" key={entry.id}>
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                      <span>{entry.category || 'Journal'}</span>
                      {formattedDate && <span>{formattedDate}</span>}
                    </div>

                    <h2 className="text-xl font-medium mt-3 mb-2">
                      <Link
                        className="hover:underline"
                        href={`/journal/${entry.slug}`}
                      >
                        {entry.title}
                      </Link>
                    </h2>

                    {entry.excerpt && (
                      <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 line-clamp-3">
                        {entry.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-300 dark:border-neutral-700 flex items-center justify-between">
                    <Link
                      className="storm-text-link inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider font-semibold"
                      href={`/journal/${entry.slug}`}
                    >
                      Read entry <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="storm-empty-state">
              Journal entries will appear here once published from the admin dashboard.
            </p>
          </div>
        )}
      </section>
    </article>
  )
}

import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateJournal: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/journal/${doc.slug}`
      payload.logger.info(`Revalidating journal entry at path: ${path}`)
      revalidatePath(path)
      revalidatePath('/journal')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/journal/${previousDoc.slug}`
      payload.logger.info(`Revalidating old journal entry at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidatePath('/journal')
    }
  }
  return doc
}

export const revalidateDeleteJournal: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/journal/${doc?.slug}`
    revalidatePath(path)
    revalidatePath('/journal')
  }
  return doc
}

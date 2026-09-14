import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

export const Audiobooks: CollectionConfig = {
  slug: 'audiobooks',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['title', 'spotifyUrl', 'order', '_status'],
    group: 'Media',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'About this audiobook',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'spotifyUrl',
      type: 'text',
      label: 'Spotify audiobook link',
      required: true,
      admin: {
        description: 'Paste the public Spotify link for this audiobook.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display order',
      admin: {
        description: 'Lower numbers appear first.',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}

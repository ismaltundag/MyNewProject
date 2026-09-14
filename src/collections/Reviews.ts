import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['quote', 'source', 'featuredOnHome', '_status'],
    group: 'Writing & Stories',
    useAsTitle: 'quote',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Review / Praise Quote',
    },
    {
      name: 'source',
      type: 'text',
      required: true,
      defaultValue: 'Goodreads reader',
      label: 'Reviewer / Publication Source',
      admin: {
        description: 'e.g. Goodreads reader, Publishers Weekly, Kirkus Reviews, Reader Review',
      },
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: true,
      label: 'Feature on Homepage',
      admin: {
        description: 'Check to display this review in the reader quotes section on the homepage.',
        position: 'sidebar',
      },
    },
    {
      name: 'rating',
      type: 'select',
      defaultValue: '5',
      options: [
        { label: '5 Stars (★★★★★)', value: '5' },
        { label: '4 Stars (★★★★☆)', value: '4' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
  versions: {
    drafts: true,
  },
}

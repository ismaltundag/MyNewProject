import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: () => true,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['title', 'date', 'location', '_status'],
    group: 'Writing & Stories',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'registrationUrl',
      type: 'text',
      label: 'Registration URL',
    },
  ],
  versions: {
    drafts: true,
  },
}

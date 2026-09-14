import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  access: {
    create: () => false,
    delete: adminOnly,
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['email', 'createdAt'],
    group: 'Readers & Audience',
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
  ],
  timestamps: true,
}

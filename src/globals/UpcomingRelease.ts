import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { revalidateTag } from 'next/cache'

export const UpcomingRelease: GlobalConfig = {
  slug: 'upcoming-release',
  label: 'Upcoming Release',
  access: {
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: 'Site & Pages',
  },
  fields: [
    {
      name: 'kicker',
      type: 'text',
      defaultValue: 'Coming September 14',
      label: 'Release Kicker / Date Badge',
      required: true,
    },
    {
      name: 'bookTitle',
      type: 'text',
      defaultValue: 'The Ember That Tethers',
      label: 'Book Title',
      required: true,
    },
    {
      name: 'seriesLabel',
      type: 'text',
      defaultValue: 'Book two',
      label: 'Series / Book Label (e.g. Book two, Prequel, Novella)',
    },
    {
      name: 'headline',
      type: 'text',
      defaultValue: 'Some embers are meant to endure.',
      label: 'Tagline / Headline',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Return to the world of J.E. Storm with a new story about what we hold onto, and what finally sets us free.',
      label: 'Synopsis / Teaser Description',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Book 3D/Flat Cover Image (Optional)',
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Join the release list',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      defaultValue: '/#join-the-storm',
      label: 'CTA Button Link',
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_upcoming_release', 'max')
      },
    ],
  },
}

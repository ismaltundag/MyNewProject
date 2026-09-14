import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { revalidateTag } from 'next/cache'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage Settings',
  access: {
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: 'Site & Pages',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Banner',
          fields: [
            {
              name: 'heroKicker',
              type: 'text',
              defaultValue: 'J.E. Storm · Author & storyteller',
              label: 'Hero Kicker',
            },
            {
              name: 'heroHeadline',
              type: 'text',
              defaultValue: 'Stories with a pulse.',
              label: 'Hero Headline',
              required: true,
            },
            {
              name: 'heroIntro',
              type: 'textarea',
              defaultValue:
                'Come closer. These are books about the heat beneath the quiet, the people who change us, and the spark that refuses to go out.',
              label: 'Hero Intro Paragraph',
              required: true,
            },
            {
              name: 'heroButtonText',
              type: 'text',
              defaultValue: 'Explore the books',
              label: 'Primary Button Text',
            },
            {
              name: 'heroButtonLink',
              type: 'text',
              defaultValue: '/books',
              label: 'Primary Button Link',
            },
            {
              name: 'heroSecondaryText',
              type: 'text',
              defaultValue: 'Meet J.E. Storm',
              label: 'Secondary Link Text',
            },
            {
              name: 'heroSecondaryLink',
              type: 'text',
              defaultValue: '/about',
              label: 'Secondary Link Target',
            },
          ],
        },
        {
          label: 'Featured Book Spotlight',
          fields: [
            {
              name: 'sectionKicker',
              type: 'text',
              defaultValue: 'Featured book',
              label: 'Section Kicker',
            },
            {
              name: 'sectionHeading',
              type: 'text',
              defaultValue: 'The beginning of everything.',
              label: 'Section Heading',
              required: true,
            },
            {
              name: 'featuredProduct',
              type: 'relationship',
              relationTo: 'products',
              label: 'Select Book from Catalog (Optional)',
              admin: {
                description: 'Select a book from your catalog, or use the custom fields below.',
              },
            },
            {
              name: 'customTitle',
              type: 'text',
              defaultValue: 'The Spark That Ignites',
              label: 'Book Title',
            },
            {
              name: 'tagline',
              type: 'text',
              defaultValue: 'Some fires are meant to be found.',
              label: 'Book Tagline / Subtitle',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              defaultValue:
                'A lyrical, simmering story of desire, reinvention, and the moment a life begins to feel like its own. Find the first book in the series, signed by J.E. Storm.',
              label: 'Book Spotlight Description',
              required: true,
            },
            {
              name: 'customPrice',
              type: 'text',
              defaultValue: '$24.00',
              label: 'Price Display',
            },
            {
              name: 'badge',
              type: 'text',
              defaultValue: 'Hardcover · Signed',
              label: 'Edition Badge',
            },
            {
              name: 'customImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Custom Photo / Cover',
            },
            {
              name: 'buttonText',
              type: 'text',
              defaultValue: 'Shop the signed edition',
              label: 'Button Text',
            },
            {
              name: 'buttonUrl',
              type: 'text',
              defaultValue: '/products/the-spark-that-ignites',
              label: 'Button Link',
            },
          ],
        },
        {
          label: 'Newsletter Section',
          fields: [
            {
              name: 'newsletterKicker',
              type: 'text',
              defaultValue: 'Join the Storm',
              label: 'Section Kicker',
            },
            {
              name: 'newsletterHeading',
              type: 'text',
              defaultValue: 'Stay close to the spark.',
              label: 'Section Heading',
              required: true,
            },
            {
              name: 'newsletterDescription',
              type: 'textarea',
              defaultValue:
                'New books, event invitations, signed-copy drops, and occasional notes from the desk.',
              label: 'Description Text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_homepage', 'max')
      },
    ],
  },
}

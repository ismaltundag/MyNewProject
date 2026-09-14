import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { link } from '@/fields/link'
import { revalidateTag } from 'next/cache'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: 'Site & Pages',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: {
        description: 'Add the social profiles shown in the website footer.',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Threads', value: 'threads' },
            { label: 'X / Twitter', value: 'twitter' },
            { label: 'Goodreads', value: 'goodreads' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'Bluesky', value: 'bluesky' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
      maxRows: 9,
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_footer', 'max')
      },
    ],
  },
}

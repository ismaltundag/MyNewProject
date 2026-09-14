import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { revalidateTag } from 'next/cache'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
    update: adminOnly,
  },
  admin: {
    group: 'Site & Pages',
  },
  fields: [
    {
      name: 'heroKicker',
      type: 'text',
      defaultValue: 'About J.E. Storm',
      label: 'Hero Kicker',
    },
    {
      name: 'heroTitle',
      type: 'text',
      defaultValue: 'Writing toward the light.',
      label: 'Hero Title',
      required: true,
    },
    {
      name: 'heroBio',
      type: 'textarea',
      defaultValue:
        'J.E. Storm writes stories about becoming, belonging, and the quiet moments that change the course of a life.',
      label: 'Hero Short Bio',
      required: true,
    },
    {
      name: 'authorPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Author Portrait Photo',
    },
    {
      name: 'storyKicker',
      type: 'text',
      defaultValue: 'The story behind the stories',
      label: 'Story Section Kicker',
    },
    {
      name: 'storyHeading',
      type: 'text',
      defaultValue: 'Every book begins with a question that will not let go.',
      label: 'Story Section Heading',
      required: true,
    },
    {
      name: 'storyBody',
      type: 'textarea',
      defaultValue:
        'When she is not writing, J.E. Storm is collecting overheard conversations, walking too far for coffee, and making room for the next idea. Her work is rooted in emotional honesty, warm atmosphere, and characters who refuse to stay where they started.',
      label: 'Story Section Body Text',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag('global_about', 'max')
      },
    ],
  },
}

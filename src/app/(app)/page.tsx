import type { Metadata } from 'next'

import { StormHome } from '@/components/StormHome'

export const metadata: Metadata = {
  title: 'J.E. Storm | Author & storyteller',
  description: 'Stories with a pulse. Discover the books, events, and journal of J.E. Storm.',
}

export default function HomePage() {
  return <StormHome />
}

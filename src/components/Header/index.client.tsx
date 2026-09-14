'use client'
import { Cart } from '@/components/Cart'
import { OpenCartButton } from '@/components/Cart/OpenCart'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Suspense } from 'react'

import type { Header } from 'src/payload-types'
import { MobileMenu } from './MobileMenu'

import { LogoIcon } from '@/components/icons/logo'
import { cn } from '@/utilities/cn'
import { usePathname } from 'next/navigation'

type Props = {
  header: Header
}

const fallbackMenu: NonNullable<Header['navItems']> = [
  { id: 'about', link: { type: 'custom', label: 'About', url: '/about' } },
  { id: 'books', link: { type: 'custom', label: 'Books', url: '/books' } },
  { id: 'audiobooks', link: { type: 'custom', label: 'Audiobooks', url: '/audiobooks' } },
  { id: 'store', link: { type: 'custom', label: 'Store', url: '/shop' } },
  { id: 'events', link: { type: 'custom', label: 'Events', url: '/events' } },
  { id: 'journal', link: { type: 'custom', label: 'Journal', url: '/journal' } },
  { id: 'join', link: { type: 'custom', label: 'Join the Storm', url: '/#join-the-storm' } },
]

export function HeaderClient({ header }: Props) {
  const menu = header.navItems?.length ? header.navItems : fallbackMenu
  const pathname = usePathname()

  return (
    <div className="storm-header relative z-20 border-b">
      <nav className="container relative flex items-center justify-between py-3">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <Link className="storm-wordmark" href="/" aria-label="J.E. Storm home">
          <LogoIcon className="h-auto w-5" />
          <span>J.E. Storm</span>
        </Link>
        {menu.length ? (
          <ul className="storm-header-nav hidden gap-7 text-sm md:flex md:items-center">
            {menu.map((item) => (
              <li key={item.id}>
                <CMSLink
                  {...item.link}
                  size="clear"
                  className={cn('relative navLink', {
                    active:
                      item.link.url && item.link.url !== '/'
                        ? pathname.includes(item.link.url)
                        : false,
                  })}
                  appearance="nav"
                />
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex justify-end gap-4">
          <Suspense fallback={<OpenCartButton />}>
            <Cart />
          </Suspense>
        </div>
      </nav>
    </div>
  )
}

import type { Footer } from '@/payload-types'

import { FooterMenu } from '@/components/Footer/menu'
import { LogoIcon } from '@/components/icons/logo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import {
  siBluesky,
  siFacebook,
  siGoodreads,
  siInstagram,
  siPinterest,
  siThreads,
  siTiktok,
  siX,
  siYoutube,
} from 'simple-icons'
import Link from 'next/link'
import { Suspense } from 'react'

const { COMPANY_NAME, SITE_NAME } = process.env

export async function Footer() {
  const payload = await getPayload({ config: configPromise })
  const footer: Footer = await payload.findGlobal({ slug: 'footer', depth: 1 })
  const menu = footer.navItems || []
  const socialLinks = footer.socialLinks || []
  const currentYear = new Date().getFullYear()
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '')
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700'

  const copyrightName = COMPANY_NAME || SITE_NAME || ''

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="container">
        <div className="relative flex w-full flex-col gap-3 border-t border-neutral-200 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:gap-12 dark:border-neutral-700">
          <div>
            <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
              <LogoIcon className="w-6" />
              <span className="sr-only">{SITE_NAME}</span>
            </Link>
          </div>
          <Suspense
            fallback={
              <div className="flex h-[188px] w-[200px] flex-col gap-2">
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
                <div className={skeleton} />
              </div>
            }
          >
            <FooterMenu menu={menu} />
          </Suspense>
          {socialLinks.length ? (
            <div className="storm-footer-social" aria-label="Social media links">
              <span className="storm-footer-social-label">Follow J.E. Storm</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const icon = {
                    instagram: siInstagram,
                    facebook: siFacebook,
                    twitter: siX,
                    tiktok: siTiktok,
                    youtube: siYoutube,
                    pinterest: siPinterest,
                    goodreads: siGoodreads,
                    bluesky: siBluesky,
                    threads: siThreads,
                  }[social.platform]

                  return (
                    <a
                      aria-label={`Follow J.E. Storm on ${social.platform}`}
                      className={`storm-social-link storm-social-${social.platform}`}
                      href={social.url}
                      key={social.id}
                      rel="noopener noreferrer"
                      target="_blank"
                      title={social.platform}
                    >
                      <svg aria-hidden="true" className="storm-social-icon" viewBox="0 0 24 24">
                        <path d={icon.path} />
                      </svg>
                    </a>
                  )
                })}
              </div>
            </div>
          ) : null}
          <div className="items-end gap-4 md:ml-auto flex flex-col">
            <ThemeSelector />
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-2 text-sm dark:border-neutral-700">
        <div className="container mx-auto flex w-full flex-col items-center gap-1 sm:flex-row sm:justify-between sm:gap-4 md:gap-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-px border-l border-neutral-400 md:inline-block" />
          <p>Designed in Kentucky, USA</p>
          <p className="md:ml-auto">
            <a
              className="text-black hover:underline dark:text-white"
              href="https://www.linkedin.com/in/ialtundag"
              rel="noopener noreferrer"
              target="_blank"
            >
              Crafted by Ismail Altundag
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

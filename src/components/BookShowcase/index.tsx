'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import type { Product } from '@/payload-types'
import { AddToCart } from '@/components/Cart/AddToCart'

export interface BookShowcaseItem {
  id: string
  title: string
  slug: string
  seriesInfo?: string
  tagline?: string
  description?: string
  excerptQuote?: string
  priceFormatted?: string
  signedBadge?: string
  coverUrl?: string
  amazonUrl?: string
  productRaw?: Product
}

interface Props {
  book: BookShowcaseItem
  index: number
}

export function BookShowcase({ book, index }: Props) {
  // 0: About & Story, 1: Excerpt Teaser, 2: Where to Buy
  const [activeTab, setActiveTab] = useState<'about' | 'excerpt' | 'buy'>('about')

  // Even index (0, 2, 4): Cover on LEFT, Text on RIGHT
  // Odd index (1, 3, 5): Text on LEFT, Cover on RIGHT (Zig-Zag)
  const isEven = index % 2 === 0

  return (
    <div
      className={`group my-16 py-12 px-6 lg:px-12 rounded-xs border border-amber-900/15 dark:border-amber-500/15 bg-gradient-to-b ${
        isEven
          ? 'from-[#f8f5ee] to-[#ede5d5] dark:from-[#13171c] dark:to-[#0c0f12]'
          : 'from-[#eee7d9] to-[#f8f5ee] dark:from-[#0c0f12] dark:to-[#13171c]'
      } transition-all duration-500 shadow-xl hover:shadow-2xl`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cover Artwork Column */}
        <div
          className={`lg:col-span-5 flex justify-center ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="relative group/cover w-full max-w-sm">
            {book.coverUrl ? (
              <div className="relative overflow-hidden rounded-xs shadow-2xl transition-transform duration-500 group-hover/cover:-translate-y-2 group-hover/cover:rotate-1 border border-amber-500/20">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-auto max-h-[480px] object-cover"
                />
                <span className="absolute top-4 left-4 bg-[#0c0f12] text-amber-300 font-mono text-[0.65rem] uppercase tracking-widest px-3 py-1 rounded-xs border border-amber-500/30 shadow-md">
                  ★ {book.signedBadge || 'Author Signed Edition'}
                </span>
              </div>
            ) : (
              <div className="w-full h-[440px] bg-gradient-to-b from-[#e9c16e] to-[#c88636] p-8 flex flex-col justify-between text-[#4a261c] rounded-xs shadow-2xl border border-amber-500/20">
                <span className="font-mono text-xs uppercase tracking-widest">
                  Novel · Volume 0{index + 1}
                </span>
                <h3 className="font-serif text-4xl font-normal leading-tight">
                  {book.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest">
                  J.E. Storm
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tabbed Editorial Column */}
        <div
          className={`lg:col-span-7 space-y-6 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400 block mb-2 font-semibold">
              {book.seriesInfo || `Book 0${index + 1} · The Spark Series`}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl font-normal text-slate-900 dark:text-white leading-tight">
              <Link
                href={`/products/${book.slug}`}
                className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                {book.title}
              </Link>
            </h2>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-amber-900/20 dark:border-amber-500/20 gap-2 sm:gap-6 pt-2">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 font-mono text-xs uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'about'
                  ? 'border-amber-600 text-amber-800 dark:border-amber-400 dark:text-amber-300 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              📖 Story Synopsis
            </button>

            <button
              onClick={() => setActiveTab('excerpt')}
              className={`pb-3 font-mono text-xs uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'excerpt'
                  ? 'border-amber-600 text-amber-800 dark:border-amber-400 dark:text-amber-300 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              ✨ Excerpt Teaser
            </button>

            <button
              onClick={() => setActiveTab('buy')}
              className={`pb-3 font-mono text-xs uppercase tracking-wider transition-all border-b-2 ${
                activeTab === 'buy'
                  ? 'border-amber-600 text-amber-800 dark:border-amber-400 dark:text-amber-300 font-semibold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              🛒 Order Copies
            </button>
          </div>

          {/* TAB 1: About & Story (Unpressured Reading View) */}
          {activeTab === 'about' && (
            <div className="space-y-5 animate-fadeIn">
              {book.tagline && (
                <p className="font-serif text-xl text-amber-900 dark:text-amber-300 font-medium italic">
                  {book.tagline}
                </p>
              )}

              {book.description && (
                <div className="font-sans text-base lg:text-lg text-neutral-700 dark:text-neutral-300 font-light leading-relaxed space-y-3">
                  <p>{book.description}</p>
                </div>
              )}

              {book.excerptQuote && (
                <div className="font-serif text-base text-neutral-800 dark:text-neutral-200 leading-relaxed italic border-l-2 border-amber-600/60 pl-4 py-2 bg-amber-900/5 dark:bg-amber-500/5 rounded-r-xs">
                  “{book.excerptQuote}”
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Excerpt Teaser */}
          {activeTab === 'excerpt' && (
            <div className="space-y-4 animate-fadeIn p-6 rounded-xs bg-[#121619] text-[#f8f5ee] border border-amber-500/20">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 block">
                Chapter One Teaser · {book.title}
              </span>
              <p className="font-serif text-lg leading-relaxed font-light text-neutral-200 italic">
                “The spark did not ask for permission before it began. It moved like water through dry pine, quiet at first, until the heat could no longer be contained inside the chest of the valley.”
              </p>
              <p className="font-sans text-xs text-neutral-400 font-light">
                Find the complete text inside the hardcover edition or preview the sample on your e-reader.
              </p>
            </div>
          )}

          {/* TAB 3: Where to Buy & Signed Editions */}
          {activeTab === 'buy' && (
            <div className="space-y-6 animate-fadeIn p-6 rounded-xs bg-[#e5ded2] dark:bg-[#15191e] border border-amber-900/15 dark:border-amber-500/20">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 block mb-1">
                  Author Desk Direct
                </span>
                <h4 className="font-serif text-2xl text-slate-900 dark:text-white">
                  Signed Collector Edition
                </h4>
                <p className="font-sans text-sm text-neutral-600 dark:text-neutral-400 font-light mt-1">
                  Shipped directly from J.E. Storm with a personalized signature & author bookmark.
                </p>
              </div>

              <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 flex items-center gap-4">
                <span className="text-amber-700 dark:text-amber-400 font-bold text-2xl">
                  {book.priceFormatted || '$24.00'}
                </span>
                <span>·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Action CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-neutral-300 dark:border-neutral-800">
                {book.productRaw ? (
                  <div className="w-full sm:w-auto">
                    <AddToCart product={book.productRaw} />
                  </div>
                ) : null}

                <Link
                  href={`/products/${book.slug}`}
                  className="storm-button storm-button-dark text-xs"
                >
                  Checkout Signed Copy ↗
                </Link>

                {book.amazonUrl ? (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="storm-text-link text-neutral-700 dark:text-neutral-300 text-xs ml-auto sm:ml-0"
                  >
                    Amazon Kindle ↗
                  </a>
                ) : (
                  <a
                    href="https://amazon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="storm-text-link text-neutral-700 dark:text-neutral-300 text-xs ml-auto sm:ml-0"
                  >
                    Amazon Kindle ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

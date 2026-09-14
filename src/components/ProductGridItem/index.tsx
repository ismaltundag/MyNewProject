import type { Product } from '@/payload-types'

import { AddToCart } from '@/components/Cart/AddToCart'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

type Props = {
  product: Product
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { gallery, priceInUSD, title } = product

  let price = priceInUSD

  const variants = product.variants?.docs

  if (variants && variants.length > 0) {
    const variant = variants[0]
    if (
      variant &&
      typeof variant === 'object' &&
      variant?.priceInUSD &&
      typeof variant.priceInUSD === 'number'
    ) {
      price = variant.priceInUSD
    }
  }

  const image =
    gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false

  return (
    <div className="relative inline-block h-full w-full group">
      <Link href={`/products/${product.slug}`}>
        {image ? (
          <Media
            className={clsx(
              'relative aspect-square object-cover border rounded-2xl p-8 bg-primary-foreground',
            )}
            height={80}
            imgClassName={clsx('h-full w-full object-cover rounded-2xl', {
              'transition duration-300 ease-in-out group-hover:scale-102': true,
            })}
            resource={image}
            width={80}
          />
        ) : null}

        <div className="font-mono text-primary/50 group-hover:text-primary flex justify-between items-center mt-4">
          <div>{title}</div>

          {typeof price === 'number' && (
            <div className="">
              <Price amount={price} />
            </div>
          )}
        </div>
      </Link>
      <div className="mt-3">
        <AddToCart product={product} />
      </div>
      {product.amazonUrl ? (
        <a
          className="mt-2 inline-flex items-center text-xs font-mono uppercase tracking-wider underline-offset-4 hover:underline"
          href={product.amazonUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Buy on Amazon{' '}
          <span className="ml-1" aria-hidden="true">
            ↗
          </span>
        </a>
      ) : null}
    </div>
  )
}

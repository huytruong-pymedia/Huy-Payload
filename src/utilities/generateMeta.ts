import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}



export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const payload = await getPayload({ config: configPromise })

  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
  })

  const siteTitle = siteSettings?.siteTitle || 'Default Site'

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? `${doc.meta.title} | ${siteTitle}`
    : siteTitle

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}

import type { ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    relationTo,
  } = props

  const limit = limitFromProps || 3

  let docs: any[] = []

  // ✅ move ra ngoài để dùng được bên dưới
  const collection = relationTo || 'posts'

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      return category
    })

    const fetchedDocs = await payload.find({
      collection,
      depth: 1,
      limit,
      ...(collection === 'posts' &&
      flattenedCategories &&
      flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    docs = fetchedDocs.docs
  } else {
    if (selectedDocs?.length) {
      docs = selectedDocs
        .map((item) => {
          if (typeof item.value === 'object') return item.value
        })
        .filter(Boolean)
    }
  }

  return (
    <div className="huyhuy my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ms-0 max-w-[48rem]"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}

      <CollectionArchive items={docs} relationTo={collection} />
    </div>
  )
}
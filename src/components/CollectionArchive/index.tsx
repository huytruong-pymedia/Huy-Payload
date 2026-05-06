import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  items: CardPostData[]
  relationTo: 'posts' | 'services'
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { items, relationTo } = props // ✅ đúng

  if (!items || items.length === 0) return null

  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {items.map((result, index) => {
          if (!result) return null

          return (
            <div className="col-span-4" key={result.slug || index}>
              <Card
                className="h-full"
                doc={result}
                relationTo={relationTo} // ✅ đúng
                showCategories
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
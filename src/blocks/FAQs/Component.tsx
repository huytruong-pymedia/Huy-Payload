'use client'

import type { FaqsBlock as FaqsBlockProps } from 'src/payload-types'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & FaqsBlockProps

export const FAQsBlock: React.FC<Props> = ({ className, title, content, items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className={cn('mx-auto my-10 w-full max-w-3xl', className)}>
      {/* Header */}
      <div className="mb-8 text-center">
        {title && (
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        )}
        {content && (
          <div className="mt-2 text-gray-600 dark:text-gray-300">
              <RichText data={content} enableGutter={false} enableProse />
          </div>

        )}
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {items?.map((item, index) => {
          const isOpen = activeIndex === index

          return (
            <div
              key={index}
              className={cn(
                'border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden',
                'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
              )}
            >
              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className={cn(
                  'w-full flex justify-between items-center px-4 py-4 text-left',
                  'bg-white dark:bg-gray-900',
                  'hover:bg-gray-50 dark:hover:bg-gray-800',
                  'transition-colors duration-200'
                )}
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.question}
                </span>

                <span
                  className={cn(
                    'text-xl transition-transform duration-300',
                    isOpen ? 'rotate-180' : ''
                  )}
                >
                  +
                </span>
              </button>

              {/* Answer */}
              <div
                className={cn(
                  'px-4 overflow-hidden transition-all duration-300',
                  isOpen ? 'py-3 opacity-100' : 'max-h-0 opacity-0 py-0'
                )}
              >
                {isOpen && (
                  <div className="text-gray-700 dark:text-gray-300">
                    <RichText data={item.answer} enableGutter={false} enableProse />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
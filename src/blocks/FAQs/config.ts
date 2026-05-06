import type { Block } from 'payload'

export const FAQs: Block = {
  slug: 'faqs',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  admin: {
    images: {
      thumbnail: {
        url: 'https://cdn.pixabay.com/photo/2021/10/11/22/11/faq-answer-6701947_640.png',
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
    },
    {
      name: 'items',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Answer',
          required: true,
        },
      ],
    },
  ],
  interfaceName: 'FaqsBlock',
}
import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { slugField } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Services: CollectionConfig = {
  slug: 'services',

  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },

  fields: [
    // TITLE
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    // FEATURE IMAGE
    {
      name: 'featureImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },

    // SLUG
    slugField(),

    // CONTENT
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        ],
    }),
    },

    // GALLERY
    {
        name: 'galleryService',
        label: 'Gallery',
        type: 'upload',
        relationTo: 'media',
        hasMany: true,
        }
  ],
}
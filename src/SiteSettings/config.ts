import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings', 
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      label: 'Site Title',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
    },
    // 👉 Socials 
    {
      name: 'socials',
      type: 'array',
      label: 'Socials',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
        
        
      ],
    },
    
  ],
}
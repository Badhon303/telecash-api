import type { CollectionConfig } from 'payload'
import { AdminsOrSuperAdmins } from '@/utils/admins-or-super-admins'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    hideAPIURL: process.env.NODE_ENV !== 'development' ? true : false,
  },
  access: {
    read: () => true,
    create: AdminsOrSuperAdmins,
    update: AdminsOrSuperAdmins,
    delete: AdminsOrSuperAdmins,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
}

import type { CollectionConfig } from 'payload'
import { SuperAdmins } from '@/utils/super-admins'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => {
      return !user || user.role !== 'super-admin'
    },
    hideAPIURL: process.env.NODE_ENV !== 'development' ? true : false,
  },
  auth: {
    tokenExpiration: 7200,
    cookies: {
      ...(process.env.NODE_ENV !== 'development' && {
        sameSite: 'None',
        domain: process.env.COOKIE_DOMAIN,
        secure: true,
      }),
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        if (user?.role === 'super-admin') {
          return true
        }

        return {
          id: {
            equals: user.id,
          },
        }
      }
      return false
    },
    create: SuperAdmins,
    update: () => false,
    delete: SuperAdmins,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      access: { update: () => false },
      required: true,
      saveToJWT: true,
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
  ],
}

// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Distributors } from './collections/Distributors'
import { Agents } from './collections/Agents'

// import { Avatar } from '@/graphics/Avatar'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    avatar: {
      Component: '@/graphics/Avatar',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // Add your own logo and icon here
    components: {
      beforeNavLinks: ['./components/DashboardNavLink'],
      graphics: {
        Icon: '/graphics/Icon/index.tsx#Icon',
        Logo: '/graphics/Logo/index.tsx#Logo',
      },
    },
    // Add your own meta data here
    meta: {
      description: 'Telecash',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/assets/favicon.ico',
        },
      ],
      titleSuffix: 'Telecash - SouthEast Bank',
    },
  },
  collections: [Users, Media, Distributors, Agents],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://telecash.com.bd',
    'https://api.telecash.com.bd',
  ],
  // If you are protecting resources behind user authentication,
  // This will allow cookies to be sent between the two domains
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://telecash.com.bd',
    'https://api.telecash.com.bd',
  ],
  upload: {
    limits: {
      fileSize: 2000000, // 2MB, written in bytes
    },
  },
})

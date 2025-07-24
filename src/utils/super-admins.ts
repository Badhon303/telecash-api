import type { Access } from 'payload'
import { User } from '@/payload-types'

export const SuperAdmins: Access<User> = ({ req }) => {
  return req.user?.role === 'super-admin'
}

import type { Access } from 'payload'
import { User } from '@/payload-types'

export const AdminsOrSuperAdmins: Access<User> = ({ req }) => {
  return req.user?.role === 'super-admin' || req.user?.role === 'admin'
}

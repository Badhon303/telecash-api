// src/admin/components/CustomMenuItem.tsx
import React from 'react'
import Link from 'next/link' // Assuming you're using Next.js Link for navigation
import Image from 'next/image'

const DashboardNavLink = () => {
  return (
    <div>
      <Image
        src="/assets/logo.webp" // **Change this to the actual path of your logo**
        alt="telecash-logo"
        width={200}
        height={100}
        style={{ paddingBottom: '20px', paddingLeft: '30px' }}
      />
      <Link className="nav__link" id="nav-users" href="/admin">
        <span className="nav__link-label">Dashboard</span>
      </Link>
    </div>
  )
}

export default DashboardNavLink

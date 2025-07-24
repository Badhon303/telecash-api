'use client'

import React from 'react'
import * as XLSX from 'xlsx'
import { Button } from '@payloadcms/ui'
import { Toaster, toast } from 'sonner'

import { Distributor } from '@/payload-types'

const ExportDistributorsButton = () => {
  const handleExport = async () => {
    try {
      const response = await fetch(`/api/distributors?pagination=false`)
      const data = await response.json()

      if (!data?.docs || !Array.isArray(data.docs) || data.docs.length === 0) {
        alert('No distributors found to export.')
        return
      }

      const rows = data.docs.map((doc: Distributor) => ({
        Date: doc.date || new Date(),
        Name: doc.name || '',
        Phone_No: doc.phoneNo || '',
        Email: doc.email || '',
        Business_Name: doc.businessName,
        District: doc.district,
        Police_Station: doc.policeStation,
        NID_NO: doc.nid,
        Trade_License_No: doc.tradeLicenseNo,
        Trade_License_Expiry_Month: doc.tradeLicenseExpiryMonth,
        Trade_License_Expiry_Year: doc.tradeLicenseExpiryYear,
      }))

      const worksheet = XLSX.utils.json_to_sheet(rows)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Distributors')
      // Generate filename with current date and time concisely
      const now = new Date()
      // Format as YYYY-MM-DD_HH-MM-SS
      const datetimeString = now.toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-')
      const filename = `Distributors_Export_${datetimeString}.xlsx`
      XLSX.writeFile(workbook, filename)
      toast.success('Export successful')
    } catch (err) {
      console.error(err)
      toast.error('Export failed')
    }
  }
  return (
    <div>
      <Toaster />
      <Button className={'btn--no-margin'} onClick={handleExport}>
        Export to Excel
      </Button>
    </div>
  )
}

export default ExportDistributorsButton

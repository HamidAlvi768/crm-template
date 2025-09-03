import React from 'react'
import { DynamicDetailDialog } from '@/components/dialogs'
import { customerDetailConfig } from '@/lib/detail-configs'

function CustomerDetail({ data: customer, trigger = null }) {
  if (!customer) return null

  return (
    <DynamicDetailDialog
      config={customerDetailConfig}
      data={customer}
      itemName={`${customer.firstName} ${customer.lastName}`}
      trigger={trigger}
    />
  )
}

export default CustomerDetail

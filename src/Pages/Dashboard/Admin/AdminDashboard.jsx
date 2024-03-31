import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'

function AdminDashboard() {
  return (
    <>
        <DashHeader />
        <div className='flex '> 
            <AdminSidepanal />
            <div className='sm:w-full  p-4'>
            <h2>Content Area</h2>
            <p>This is the main content area of your dashboard.</p>
        </div>
        </div>
    </>
  )
}

export default AdminDashboard
import React from 'react'
import Sidebar from '../../../Components/SidePanel/User'
import DashHeader from '../../../Components/SidePanel/DashHeader'
function Profile() {
  return (
    <>
        <DashHeader />
        <div className='flex '> 
            <Sidebar />
            <div className='sm:w-full  p-4'>
            <h2>Content Area</h2>
            <p>This is the main content area of your dashboard.</p>
        </div>
        </div>
    </>
  )
}

export default Profile
import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
function Profile() {
  return (
    <>
        <DashHeader />
        <div className='flex '> 
            <UserSidebar />
            <div className='sm:w-full  p-4'>
            <h2>Content Area</h2>
            <p>This is the main content area of your dashboard.</p>
        </div>
        </div>
    </>
  )
}

export default Profile
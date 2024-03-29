import React from 'react'
import Sidebar from '../../Components/SidePanel/User'
import Content from '../../Components/Authentication/Content'
import DashHeader from '../../Components/SidePanel/DashHeader'
function Profile() {
  return (
    <>
        <DashHeader />
        <div className='flex '> 
            <Sidebar />
            <Content />
        </div>
    </>
  )
}

export default Profile
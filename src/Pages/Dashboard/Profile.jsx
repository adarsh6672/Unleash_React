import React from 'react'
import Sidebar from '../../Components/SidePanel/User'
import Content from '../../Components/Content'
import DashHeader from '../../Components/Dashboard/DashHeader'
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
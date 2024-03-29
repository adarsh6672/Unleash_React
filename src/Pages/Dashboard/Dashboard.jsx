import React from 'react'
import DashHeader from '../../Components/SidePanel/DashHeader'
import Sidebar from '../../Components/SidePanel/User'
import Content from '../../Components/Authentication/Content'

function Dashboard() {
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

export default Dashboard
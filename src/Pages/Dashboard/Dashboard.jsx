import React from 'react'
import DashHeader from '../../Components/Dashboard/DashHeader'
import Sidebar from '../../Components/SidePanel/User'
import Content from '../../Components/Content'

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
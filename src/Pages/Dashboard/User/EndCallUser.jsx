import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import { useLocation } from 'react-router-dom'

function EndCallUser() {

  const location = useLocation()
  const sessionId = location.state

  console.log(sessionId)
  return (
    <>
    <DashHeader />
    <div className='flex '>
        <UserSidebar />
        <div className='sm:w-full  p-4  '>
                <h1>{sessionId}</h1>
        </div>
    </div>
</>
  )
}

export default EndCallUser

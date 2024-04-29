import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'

function EndCallUser() {
  return (
    <>
    <DashHeader />
    <div className='flex '>
        <UserSidebar />
        <div className='sm:w-full  p-4  '>
                Call ended
        </div>
    </div>
</>
  )
}

export default EndCallUser

import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'

function CounselorDashboard() {
  return (
    <>
        <DashHeader/>
        <div className='flex gap-3'>
        <CounselorSidebar/>
        <div className='sm:w-full  p-4 '>

        </div>
        </div>
    </>
  )
}

export default CounselorDashboard
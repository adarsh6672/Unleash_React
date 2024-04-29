import React from 'react'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import DashHeader from '../../../Components/SidePanel/DashHeader'

function EndCall() {
    return (
        <>
            <DashHeader />
            <div className='flex '>
                <CounselorSidebar />
                <div className='sm:w-full  p-4  '>
                        Call ended
                </div>
            </div>
        </>
    )
}

export default EndCall

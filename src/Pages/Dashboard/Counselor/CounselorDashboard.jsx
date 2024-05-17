import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { AxiosInstance } from '../../../Utils/AxiosInstance'
import img from '../../../Assets/imgs/article.webp'
import { useNavigate } from 'react-router-dom'


function CounselorDashboard() {
  const [dashData, setDashData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    AxiosInstance.get('/consultation/counselor/get-dashboard-data')
      .then(res => {
        setDashData(res.data)
      }).catch(err => console.log(err))
  }, [])
  return (
    <>
      <DashHeader />
      <div className='flex gap-3'>
        <CounselorSidebar />
        <div className='sm:w-full  px-4 '>
          {dashData && (
            <div className='sm:grid grid-cols-12 min-h-32 gap-10'>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>TODAYS SESSION</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>{dashData.todaysSession}</h1>
              </div>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>TOTAL SESSION</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>{dashData.totalSession}</h1>
              </div>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>TOTAL INCOME</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>₹  {dashData.totalIncome}</h1>
              </div>
              <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>LAST WEEK PENDING</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>₹  {dashData.lastWeekPending}</h1>
              </div>
            </div>
          )}
          <div className='mt-10'>
            <div className=' p-5 w-3/4 mx-auto flex sm:grid grid-cols-3 bg-gradient-to-r from-orange-300 to-indigo-300 rounded-lg shadow-lg shadow-slate-300'>
              <div className='col-span-2 my-auto text-center'>
                <h1 className='text-2xl font-medium'>Share Your Thoughts In Unleash Article Hub. Get More Attached With Our People..</h1>
                <button className='p-2 bg-indigo-800 rounded-xl mt-3 text-white font-bold' onClick={() => navigate('/counselor/article')}>Take To Article Hub</button>
              </div>
              <div className=' col-span-1 flex justify-end'>
                <img src={img} alt=""
                  className='object-cover rounded-xl w-52  ' />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default CounselorDashboard
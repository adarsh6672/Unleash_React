import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { AxiosInstance } from '../../../Utils/AxiosInstance'
import img from '../../../Assets/imgs/article.webp'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'


function CounselorDashboard() {
  const [dashData, setDashData] = useState()
  const [matchingSlot, setMatchingSlot] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    AxiosInstance.get('consultation/counselor/get-dashboard-data')
      .then(res => {
        setDashData(res.data)
        console.log(res)
      }).catch(err => console.log(err))
    console.log('clling')
  }, [])

  useEffect(() => {
    AxiosInstance.get('/consultation/session/get-allbookings-ofcounselor')
      .then(res => {
        console.log(res.data)

        const matchingSlots = res.data.map(item =>
          isSlotWithinOneHour(item.sessionBooking.avilability.slot) ? item : null
        ).filter(Boolean); // Filter out null values
        console.log(matchingSlots)
        // Then, check if there are any matching slots and update your state
        if (matchingSlots.length > 0) {
          setMatchingSlot(matchingSlots[0]); // Or however you want to handle multiple matching slots
        }

        // Set matching slots

        // console.log(matchingSlots)

      })
      .catch(err => console.log(err))
  }, [])

  const isSlotWithinOneHour = (slotTime) => {


    const slotTimeObj = moment(slotTime, 'YYYY-MM-DDTHH:mm:ss');
    // console.log(slotTimeObj)


    const currentTime = moment();
    // console.log(currentTime)
    const differenceInHours = slotTimeObj.diff(currentTime, 'hours');
    // console.log(Math.abs(differenceInHours) >= -60 && Math.abs(differenceInHours) <= 0+'-----------------------------')
    return Math.abs(differenceInHours) >= -60 && Math.abs(differenceInHours) <= 0;
  };

  function formatTime(timeString) {
    const date = new Date(timeString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = date.toLocaleString("en-US", options);
    return formattedTime;
  }

  function formatDate(timeString) {
    const date = new Date(timeString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  const handleSession = (id) => {
    navigate('/counselor/videocall', { state: id })
  }


  return (
    <>
      <DashHeader />
      <div className='flex gap-3'>
        <CounselorSidebar />
        <div className='sm:w-full  px-4 '>
          {dashData && (
            <div className='grid w-3/4 sm:grid-cols-12 min-h-32 mx-auto gap-10'>
              <div className='col-span-4 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>TODAYS SESSION</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>{dashData.todaysSession}</h1>
              </div>
              <div className='col-span-4 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>TOTAL SESSION</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>{dashData.totalSession}</h1>
              </div>
              <div className='col-span-4 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>TOTAL INCOME</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>₹  {dashData.totalIncome}</h1>
              </div>
              {/* <div className='col-span-3 rounded-lg bg-slate-100 shadow-lg shadow-slate-400 p-5'>
                <h1 className='text-center text-lg font-medium text-orange-500'>LAST WEEK PENDING</h1>
                <h1 className='text-center text-lg font-bold text-indigo-800 p-5'>₹  {dashData.lastWeekPending}</h1>
              </div> */}
            </div>
          )}

          <div>

            <div className='w-3/4 border-2 border-slate-100 shadow-lg shadow-slate-300 rounded-lg mx-auto m-5 flex justify-around'>

              <img className='hidden sm:block h-2/6 w-2/6 opacity-45' src={img} alt="images" />
              <div className=' text-indigo-900 text-center rounded-lg my-auto h-fit'>
                {matchingSlot && (
                  <div>
                    <h1 className='text-orange-500 font-bold text-center text-2xl'>Live Session</h1>
                    <h1 className='pt-5 font-bold text-2xl text-indigo-800'>{matchingSlot.userDto.fullname}</h1>
                    <h1 className='py-5  text-indigo-800'>Time : {formatTime(matchingSlot.sessionBooking.avilability.slot)}</h1>
                    <button className='bg-orange-500 p-2 rounded-lg text-white'
                      onClick={() => handleSession(matchingSlot.userDto.id)}>Start Now</button>
                  </div>
                )}
                {!matchingSlot && (
                  <div>
                    <h1 className='text-2xl font-bold text-indigo-800'>NO SESSION ON THIS TIME ..!</h1>
                  </div>
                )}

              </div>
            </div>
          </div>
          <div className='my-10'>
            <div className=' p-5 w-3/4 mx-auto  sm:grid grid-cols-3 bg-gradient-to-r from-orange-300 to-indigo-300 rounded-lg shadow-lg shadow-slate-300'>
              <div className='col-span-2 my-auto text-center'>
                <h1 className='text-2xl font-medium'>Share Your Thoughts In Unleash Article Hub. Get More Attached With Our People..</h1>
                <button className='p-2 bg-indigo-800 rounded-xl mt-3 text-white font-bold' onClick={() => navigate('/counselor/article')}>Take To Article Hub</button>
              </div>
              <div className=' col-span-1 flex justify-center mt-3 sm:justify-end'>
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
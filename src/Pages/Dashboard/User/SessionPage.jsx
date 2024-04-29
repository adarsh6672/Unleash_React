import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import { BASE_URL } from '../../../Utils/const';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from '../../../Assets/imgs/sessionImg.jpg'
import moment from 'moment';
import { AxiosInstance } from '../../../Utils/AxiosInstance';


function SessionPage() {
  const token = localStorage.getItem("token")
  const [data, setData] = useState();
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState(true)
  const [cancelslot, setCancelSlot] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const [update, setUpdate] = useState(true)
  useEffect(() => {
    axios.get(BASE_URL + '/consultation/session/get-dashboard-data', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      setData(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })

  }, [])

  useEffect(() => {


    AxiosInstance.get('/consultation/session/get-allbookings')
      .then(resp => {
        setSessions(resp.data)
        console.log(resp.data)
      }).catch(error => {
        console.log('error in fetching data' + error)
      })
  }, [update])


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

  const compareDate = (givenDateTimeString) => {
    const givenDateTime = new Date(givenDateTimeString);
    const currentDateTime = new Date();
    if (givenDateTime < currentDateTime.setHours(currentDateTime.getHours() - 1)) {
      return false;
    } else {
      return true;
    }
  }

  const isSlotWithinOneHour = (slotTime) => {


    const slotTimeObj = moment(slotTime, 'YYYY-MM-DDTHH:mm:ss');

    const currentTime = moment();
    const differenceInHours = slotTimeObj.diff(currentTime, 'minutes');
    console.log('diff', differenceInHours)
    return Math.abs(differenceInHours) >= -60 && Math.abs(differenceInHours) <= 0;
  };

  const isSlotCancel = (slotTime) => {
    const slotTimeObj = moment(slotTime, 'YYYY-MM-DDTHH:mm:ss');
    const currentTime = moment();
    const differenceInHours = slotTimeObj.diff(currentTime, 'hours');
    return Math.abs(differenceInHours) >= 6;
  }

  const cancelSlot = (slotId) => {
    setCancelSlot(slotId)
    console.log(slotId)
    setIsOpen(true);
  }

  const cancelSlotHandler = async () => {

    console.log("started")
    await axios.put(BASE_URL + '/consultation/session/cancel-slot', null, {
      params: {
        slotId: sessions[cancelslot].sessionBooking.id
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      setUpdate(!update)
      setIsOpen(false)
    }).catch(err => {
      console.log(err)
      setIsOpen(false)
    })
  }

  const handleVideoCall=(id)=>{
    navigate('/user/videocall',{state:id})
  }
  return (
    <>
      <DashHeader />
      <div className='flex '>
        <UserSidebar />
        <div className='sm:w-full  p-4'>
          <div className='w-2/3 border-2 border-slate-100 shadow-lg shadow-slate-300 rounded-lg mx-auto m-5 flex justify-around'>

            <div className='text-center rounded-lg my-auto h-fit'>
              {data && data.subscription.sessionCount > 0 ? (
                <div>
                  <h1 className='p-5 text-xl text-orange-500'>You Have {data.subscription.sessionCount} Session Left In Your Plan ..!</h1>
                  <button className='bg-indigo-800 text-white rounded-md p-2' onClick={() => navigate('/counsellors')}>Book Now</button>
                  <h1 className='text-sm mt-1 text-slate-500'>Plan Expires On {formatDate(data.subscription.endOn)}</h1>
                </div>
              ) : (
                <div>
                  <h1 className='p-5 text-xl text-orange-500 font-bold'>No Session Left In Your Plan ..!</h1>
                  <button className='bg-indigo-800 text-white rounded-md p-2 cursor-pointer' onClick={() => navigate('/plan-pricing')}>Subscirbe Now</button>
                </div>
              )}

            </div>
            <img className='h-2/6 w-2/6' src={img} alt="images" />
          </div>
          <div className='flex justify-around'>
            <button className={`px-4 py-2 rounded-3xl ${upcoming ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => setUpcoming(true)}>Upcoming Sessions</button>
            <button className={`px-4 py-2 rounded-3xl ${!upcoming ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={() => setUpcoming(false)}>Completed Sessions</button>
          </div>

          <div className='sm:grid grid-cols-12 p-10 mt-10 justify-around w-4/5 mx-auto'>

            {sessions && upcoming && sessions.map((item, index) => (
              <div className='col-span-3 p-7 border-2 border-slate-100 rounded-lg shadow-lg shadow-slate-300 w-fit bg-slate-100 text-center'
                style={{ display: compareDate(item.sessionBooking.avilability.slot) ? "block" : "none" }}>
                <div>
                  <h1 className='font-bold p-2'>{item.counselorName}</h1>
                  <h1 className='text-orange-500 p-1 text-md underline cursor-pointer' onClick={() => navigate('/open-profile', { state: item.counselorId })}>View Profile</h1>
                  <h1 className='py-1'> SESSION ID : <span className='text-orange-500'>ULSID{item.sessionBooking.id}</span> </h1>
                  <h1 className='py-1'>DATE : <span className='text-orange-500'> {formatDate(item.sessionBooking.avilability.slot)}</span></h1>
                  <h1 className='py-1'>TIME : <span className='text-orange-500'>{formatTime(item.sessionBooking.avilability.slot)}</span></h1>
                  {item.sessionBooking.status === 'CANCELED' ? (
                    <div className='text-red-600 font-bold text-xl'> Canceled</div>
                  ) : (
                    <div>
                      {isSlotWithinOneHour(item.sessionBooking.avilability.slot) ? (
                        <button className='bg-orange-500 px-5 py-1 text-white rounded-md '>Join</button>
                      ) : (
                        <button className=' bg-slate-300 px-5 py-1 rounded-md ' onClick={() => handleVideoCall(item.counselorId)}>Join</button>
                      )}

                      {isSlotCancel(item.sessionBooking.avilability.slot) ? (
                        <p className='text-indigo-800 cursor-pointer text-right mt-1' onClick={() => cancelSlot(index)}>Cancel</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  )}

                </div>
              </div>
            ))}


            {sessions && !upcoming && sessions.map((item) => (
              <div className='col-span-3 p-5 m-3 border-2 border-slate-100 rounded-lg shadow-lg shadow-slate-300 w-fit bg-slate-100 text-center'
                style={{ display: compareDate(item.sessionBooking.avilability.slot) ? "none" : "block" }}>
                <div>
                  <h1 className='font-bold p-2'>{item.counselorName}</h1>
                  <h1 className='text-orange-500 p-1 text-md underline cursor-pointer' onClick={() => navigate('/open-profile', { state: item.counselorId })}>View Profile</h1>
                  <h1 className='py-1'> SESSION ID : <span className='text-orange-500'>ULSID{item.sessionBooking.id}</span> </h1>
                  <h1 className='py-1'>DATE : <span className='text-orange-500'> {formatDate(item.sessionBooking.avilability.slot)}</span></h1>
                  <h1 className='py-1'>TIME : <span className='text-orange-500'>{formatTime(item.sessionBooking.avilability.slot)}</span></h1>
                </div>
              </div>
            ))}

          </div>


        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Are you sure you want to cancel this Slot ?</p>
            <div className="mt-4 flex justify-end">
              <button className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={cancelSlotHandler}>Confirm</button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SessionPage

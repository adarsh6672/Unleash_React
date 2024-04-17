import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import img from '../../../Assets/imgs/Frame-11-768x479.webp'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/const'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const token = localStorage.getItem("token")
  const [data , setData] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(BASE_URL+'/consultation/session/get-dashboard-data',{
      headers :{
        'Authorization':`Bearer ${token}`
    }
    }).then(res=>{
      setData(res.data)
      console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })

  },[])


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
  return (
    <>
        <DashHeader />
        <div className='flex '> 
            <UserSidebar/>
            <div className='sm:w-full  p-4'>
            <h2 className='text-center text-2xl font-bold text-orange-500 mb-10'>Welcome To Unleash . </h2>
            <div className='w-2/3 border-2 border-slate-100 shadow-lg shadow-slate-300 rounded-lg mx-auto m-5 flex justify-around'>
              <img className='h-2/6 w-2/6' src={img} alt="images" />
              <div className='bg-indigo-800 text-white text-center rounded-lg my-auto h-fit'>
                {data && data.counselorName!== null ? (
                  <h1 className='p-5'>You Have Upcoming Session</h1>
                ):(
                  <h1 className='p-5'>No Upcoming Session</h1>
                )}
                
              </div>
            </div>
            
              <div className='sm:flex p-10 mt-10 justify-around w-4/5 mx-auto'> 
              <div className=' border-2 border-slate-100 rounded-lg shadow-lg shadow-slate-300 p-5 w-2/5 bg-slate-100 text-center'>
                <h1 className='text-indigo-800 font-bold mb-2'>Active Plan</h1>
                {data && data.plan !== null ?(
                    <div className='m-auto'>
                    <h1 className='text-xl font-bold text-orange-500'>{data.plan.planName}</h1>
                    <h1 className='m-2'>{data.plan.noOfSession} Session</h1>
                    <h1>Chat Access</h1>
                  </div>
                ):(
                  <div className='m-auto'>
                  <h1 className='text-xl font-bold text-orange-500'>No Active Plans</h1>
                  <button className='bg-indigo-800 mt-4  text-white rounded-md p-2' onClick={()=>navigate('/plan-pricing')}>Subscribe</button>
                </div>
                )}
                
               
              </div>
              <div className='p-5 border-2 border-slate-100 rounded-lg shadow-lg shadow-slate-300 w-2/5 bg-slate-100 text-center'>
                  <h1 className='text-indigo-800 font-bold mb-2'>Active Counselor</h1>
                  {data && data.counselorName !== null ?(
                      <div>
                      <h1 className='font-bold'>{data.counselorName}</h1>
                      <h1 className='text-orange-500 text-md underline cursor-pointer' onClick={()=>navigate('/open-profile',{state:data.counselorId})}>View Profile</h1>
                      <h1 className='py-1'> SESSION ID : <span className='text-orange-500'>ULSID{data.sessionBooking.id}</span> </h1>
                      <h1 className='py-1'>DATE : <span className='text-orange-500'> {formatDate(data.sessionBooking.avilability.slot)}</span></h1>
                      <h1 className='py-1'>TIME : <span className='text-orange-500'>{formatTime(data.sessionBooking.avilability.slot)}</span></h1>
                    </div>
                  ):(
                    <div>
                      <h1 className='text-xl text-orange-500 font-bold'>No Counselor Avilable</h1>
                      <button className='bg-indigo-800 mt-4  text-white rounded-md p-2 ' onClick={()=>navigate('/counsellors')}>Book Session</button>
                    </div>
                  )}
                  
                  
              </div>
          </div>

           
            
        </div>
        </div>
    </>
  )
}

export default Dashboard
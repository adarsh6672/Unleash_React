import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import { BASE_URL } from '../../../Utils/const';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from '../../../Assets/imgs/sessionImg.jpg'


function SessionPage() {
    const token = localStorage.getItem("token")
  const [data , setData] = useState();
  const [sessions , setSessions]= useState([])
  const navigate = useNavigate();
  const [upcoming , setUpcoming] = useState(true)
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

  useEffect(()=>{
    axios.get(BASE_URL+'/consultation/session/get-allbookings',{
        headers :{
            'Authorization':`Bearer ${token}`
        }
    }).then(res=>{
        setSessions(res.data)
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

  const compareDate=(givenDateTimeString)=>{
    const givenDateTime = new Date(givenDateTimeString);
    const currentDateTime = new Date();
    if (givenDateTime < currentDateTime.setHours(currentDateTime.getHours()+1)) {
        return false;
    } else {
        return true;
    }
  }
  return (
   <>
    <DashHeader />
        <div className='flex '> 
            <UserSidebar />
            <div className='sm:w-full  p-4'>
                <div className='w-2/3 border-2 border-slate-100 shadow-lg shadow-slate-300 rounded-lg mx-auto m-5 flex justify-around'>
                
                <div className='text-center rounded-lg my-auto h-fit'>
                    {data && data.subscription.sessionCount > 0  ? (
                        <div>
                            <h1 className='p-5 text-xl text-orange-500'>You Have {data.subscription.sessionCount} Session Left In Your Plan ..!</h1>
                            <button className='bg-indigo-800 text-white rounded-md p-2' onClick={()=>navigate('/counsellors')}>Book Now</button>
                            <h1 className='text-sm mt-1 text-slate-500'>Plan Expires On {formatDate(data.subscription.endOn)}</h1>
                        </div>
                    ):(
                        <div>
                        <h1 className='p-5 text-xl text-orange-500 font-bold'>No Session Left In Your Plan ..!</h1>
                        <button className='bg-indigo-800 text-white rounded-md p-2 cursor-pointer' onClick={()=>navigate('/plan-pricing')}>Subscirbe Now</button>
                    </div>
                    )}
                    
                </div>
                <img className='h-2/6 w-2/6' src={img} alt="images" />
                </div>
            <div className='flex justify-around'>
               <button className={`px-4 py-2 rounded-3xl ${upcoming ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`} onClick={()=>setUpcoming(true)}>Upcoming Sessions</button>
               <button className={`px-4 py-2 rounded-3xl ${!upcoming ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}    onClick={()=>setUpcoming(false)}>Completed Sessions</button>
                </div>
                
                <div className='sm:grid grid-cols-12 p-10 mt-10 justify-around w-4/5 mx-auto'> 
            
                    {sessions && upcoming && sessions.map((item)=>(
                        <div className='col-span-3 p-5 border-2 border-slate-100 rounded-lg shadow-lg shadow-slate-300 w-fit bg-slate-100 text-center'
                        style={{ display: compareDate(item.sessionBooking.avilability.slot) ? "block" : "none" }}>
                        <div>
                        <h1 className='font-bold p-2'>{item.counselorName}</h1>
                        <h1 className='text-orange-500 p-1 text-md underline cursor-pointer' onClick={()=>navigate('/open-profile',{state:item.counselorId})}>View Profile</h1>
                        <h1 className='py-1'> SESSION ID : <span className='text-orange-500'>ULSID{item.sessionBooking.id}</span> </h1>
                        <h1 className='py-1'>DATE : <span className='text-orange-500'> {formatDate(item.sessionBooking.avilability.slot)}</span></h1>
                        <h1 className='py-1'>TIME : <span className='text-orange-500'>{formatTime(item.sessionBooking.avilability.slot)}</span></h1>
                      </div>
                      </div>
                    ))}


                    {sessions && !upcoming && sessions.map((item)=>(
                        <div className='col-span-3 p-5 border-2 border-slate-100 rounded-lg shadow-lg shadow-slate-300 w-fit bg-slate-100 text-center'
                        style={{ display: compareDate(item.sessionBooking.avilability.slot) ? "none" : "block" }}>
                        <div>
                        <h1 className='font-bold p-2'>{item.counselorName}</h1>
                        <h1 className='text-orange-500 p-1 text-md underline cursor-pointer' onClick={()=>navigate('/open-profile',{state:item.counselorId})}>View Profile</h1>
                        <h1 className='py-1'> SESSION ID : <span className='text-orange-500'>ULSID{item.sessionBooking.id}</span> </h1>
                        <h1 className='py-1'>DATE : <span className='text-orange-500'> {formatDate(item.sessionBooking.avilability.slot)}</span></h1>
                        <h1 className='py-1'>TIME : <span className='text-orange-500'>{formatTime(item.sessionBooking.avilability.slot)}</span></h1>
                      </div>
                      </div>
                    ))}
                
                </div>


            </div>
        </div>
   </>
  )
}

export default SessionPage

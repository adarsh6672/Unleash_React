import React from 'react'
import Header from '../../../Components/Header'
import Footer from '../../../Components/Footer'
import { useLocation, useNavigate } from 'react-router-dom'

function SessionBooked() {

    const location = useLocation();
    const data = location.state;
    const navigate= useNavigate()

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
        <Header />
        <h1 className='text-center text-orange-500 font-bold text-3xl p-14'>Congratulations ! Your Session Has Been Booked .</h1>
        <div className=''>
            {data && (
                <div className='border-2 border-slate-100 shadow-lg text-center text-md shadow-slate-300 rounded-xl p-10 w-fit mx-auto my-auto'>
                <h1 className='font-bold text-lg p-5  text-indigo-800'>{data.counselor}</h1>
                
                <h1 className='py-3'> SESSION ID : <span className='text-orange-500'>ULSID{data.sessionId}</span> </h1>
                <h1 className='py-3'>DATE : <span className='text-orange-500'> {formatDate(data.bookedOn)}</span></h1>
                <h1 className='py-3'>TIME : <span className='text-orange-500'>{formatTime(data.bookedOn)}</span></h1>
            </div>
            )}
            
            <h1 className='text-center text-xl mt-10'>We will remind you 30 minutes before session</h1>
            <div className='flex justify-center p-16'>
                <button className='bg-orange-500 rounded-xl text-white p-2 mx-auto'
                onClick={()=>navigate('/user/dashboard')}
                >Go To Dashboard</button>
            </div>

        </div>
        

        <Footer/>
    
    </>
  )
}

export default SessionBooked

import React, { useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import UserSidebar from '../../../Components/SidePanel/UserSidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegSmile } from "react-icons/fa";
import Rating from '../../../Components/Rating/Rating';
import { toast } from 'react-hot-toast';
import { AxiosInstance } from '../../../Utils/AxiosInstance';


function EndCallUser() {

  const location = useLocation()
  const sessionId = location.state

  const navigate = useNavigate()

  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const notifySuccess = (message) => {
    toast.success(message);
  };
  const notifyError = (message) => {
    toast.error(message);
  };

  const handleFeedback = async() => {
    if (rating === 0) {
      notifyError('Give Rating To Submit Feedback')
    }else{
      const data={
        rating : rating,
        feedback : feedback,
        sessionId : sessionId
      }
      await AxiosInstance.post('/consultation/session/feedback/submit',data)
      .then(res=>{
        notifySuccess('Thank You For Your Feedback')
        navigate('/user/dashboard')
      })
    }
  }
  return (
    <>
      <DashHeader />
      <div className='flex '>
        <UserSidebar />
        <div className='sm:w-full  p-4  '>
          <div className='w-3/4 bg-slate-100 rounded-xl mx-auto text-center p-5'>
            <h1 className=' text-2xl font-bold'>Session Has Ended </h1>
            <h1 className='text-xl '>Session Id  :  ULSID {sessionId}</h1>
            <div className='flex justify-center p-3'>
              <h1 className='text-orange-500 text-xl'>Share Your Experience With Us </h1>
              <FaRegSmile className='text-orange-500 m-1 text-xl' />
            </div>
          </div>

          <div className='w-3/4 mx-auto'>
            <div className='flex justify-center '>
              <h1 className='font-medium text-3xl text-center border-b-4 border-orange-400 pb-2  max-w-lg mt-8'>Feedback Of Session</h1>
            </div>
            <div className='p-2'>
              <h1>How Would You Rate Session Overall ?</h1>
              <div >
                <Rating rating={rating} setRating={setRating} />
              </div>
              <div className="">
                <textarea className="form-textarea block w-full focus:bg-white rounded-lg" id="my-textarea" value={feedback} rows="8" onChange={e => setFeedback(e.target.value)}></textarea>
              </div>
            </div>
            <div className=''>
              <button className='bg-orange-500 text-white rounded-md px-2 py-1 m-2' onClick={handleFeedback}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EndCallUser

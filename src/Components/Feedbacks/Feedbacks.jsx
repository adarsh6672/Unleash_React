import React, { useEffect, useState } from 'react'
import { IoMdStar } from "react-icons/io";
import { BASE_URL } from '../../Utils/const';
import axios from 'axios';
import Star from '../Rating/Star';

function Feedbacks() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState()
  useEffect(() => {
    axios.get(BASE_URL + '/plan/public/get-all-feedbacks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      setData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <div className='w-5/6  mx-auto  relative z-0'>
        {data && (
          <div className='w-full h-96 py-5 flex flex-row overflow-x-scroll scrollbar-hide'>
            {data.slice(0, 8).map(item => (
              <div className='bg-white  w-72 mx-5 rounded-2xl shrink-0'>
                <h1 className='font-bold m-5 text-xl whitespace-nowrap overflow-hidden text-ellipsis'>{item.patient}</h1>
                <div className='text-orange-500 flex  mx-5'>
                  <Star rating={item.rating} />
                </div>
                <h1 className='m-5'>{item.feedback}</h1>              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Feedbacks
import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import axios from 'axios';
import { BASE_URL } from '../../../Utils/const';

function Plans() {

    const token= localStorage.getItem("token")
    const[data , setData] = useState([]);
    useEffect(()=>{
        axios.get(BASE_URL+'/consultation/admin/get-all-plans',{
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            console.log(res)
            setData(res.data);
        })
    },[])

  return (
    <>
         <DashHeader />
        <div className='flex '> 
            <AdminSidepanal />
            <div className='sm:w-full  p-4'>
                <h1 className='text-center text-2xl text-orange-500 font-bold'>Plans Available</h1>
                {data&& data.map((item) => (
                    <div className='  w-3/4 mx-auto my-5 flex sm:grid grid-cols-12 bg-gradient-to-r from-orange-300 to-indigo-300 rounded-lg shadow-lg shadow-slate-300'>
                    
                    <div className='col-span-8 m-7 '>
                      <h1 className='text-xl mb-4 text-slate-600 font-medium'>Plan Name : <span className='text-black'>{item.planName}</span></h1>
                      <h1 className='text-xl mb-4 text-slate-600 font-medium'>Plan Description : <span className='text-black text-lg'>{item.description}</span></h1>
                      <h1 className='text-xl  text-slate-600 font-medium'>Plan Price : <span className='text-green-800'>{item.price} Rs.</span></h1>
                    </div>
                    <div className='col-span-1 flex flex-col'>
                        <button className='my-auto bg-indigo-800 rounded-md text-white'>
                            Edit
                        </button>
                        <button className='my-auto  bg-red-800 rounded-md text-white'>
                            Hide
                        </button>
                    </div>
                    <div className='p-5 col-span-3 flex justify-end'>
                      <img src={item.iconUrl} alt="" 
                      className='object-cover rounded-lg w-40 h-40'/>
                    </div>
                </div>
               
                ))}
                <div className='flex justify-center pt-5'>
                    <button className='bg-indigo-800 w-3/4 rounded-lg p-2 text-white'>+ Add New Plan</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Plans

import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import axios from 'axios';
import { BASE_URL } from '../../../Utils/const';
import { AxiosInstance } from '../../../Utils/AxiosInstance';


function Plans() {
    const[isOpen , setIsOpen] = useState(false)
    const [name , setName] = useState();
    const [description , setDescription] = useState()
    const [price , setPrice]  = useState()
    const [image , setImage] = useState()
    const [session , setSession]= useState()
    const [update , setUpdate] = useState(true)

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
    },[update])

    const handleUpload = () =>{
        if(name && description && price && image && session){
            const formData = new FormData();
            const data = {
                planName: name,
                price : price,
                description: description,
                noOfSession: session
            }
            formData.append('file',image)
            formData.append('data',data)
            axios.post('/consultation/admin/add-plan',formData,{
                headers :{
                    'Authorization':`Bearer ${token}`
                }
            })
            .then(res=>{
                console.log(res.data)
                setUpdate(!update)
                isOpen(false)
            })
            .catch(err=>{
                console.log(err)
                setIsOpen(false)
        })
        }
    }

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
                    <button className='bg-indigo-800 w-3/4 rounded-lg p-2 text-white' onClick={()=>setIsOpen(true)}>+ Add New Plan</button>
                </div>
            </div>
        </div>
        {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-md">
                    <h1 className='text-center font-bold text-orange-500'>Add Plan</h1>
                    <div className='p-2 flex justify-between'>
                        <label >Plan Name</label>
                        <input type="text" onChange={(e)=>setName(e.target.value)} />
                    </div>
                    <div className='p-2 flex justify-between'>
                        <label >Price</label>
                        <input type="text" className='' onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                    <div className='p-2 flex justify-between'>
                        <label >Description </label>
                        <input type="text"  onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div className='p-2 flex justify-between'>
                        <label >No Of Session </label>
                        <input type="number" onChange={(e)=>setSession(e.target.value)}/>
                    </div>
                    <div className='p-2 flex justify-between'>
                        <label >Upload Image </label>
                        <input 
                    className="" id="file_input" type="file" onChange={(e)=>setImage(e.target.value)}/>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={handleUpload}>Confirm</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded" onClick={()=>setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
            )}
    </>
  )
}

export default Plans

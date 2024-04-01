import React, { useEffect, useState } from 'react'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import axios from 'axios'
import { BASE_URL } from '../../../Utils/const'
import { useNavigate, useParams } from 'react-router-dom'

function ViewProfile() {
    const token = localStorage.getItem("token")
    const [data , setData] = useState();
    const [profilePic , setProfilePic]= useState();
    const {userId} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        
        axios.get(BASE_URL+`/admin/profileverification/${userId}`,{
            headers: {
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
            console.log(res)
            setData(res.data)
        }).catch(err=>{
            console.log(err)
        })

        axios.get(BASE_URL+`/admin/profilephoto/${userId}`,{
            responseType : 'arraybuffer',
            headers: {
                'Authorization':`Bearer ${token}` 
            }
        }).then(response =>{
            console.log(response)
              const url = URL.createObjectURL(new Blob([response.data]));
              setProfilePic(url)
        })
    },[])

    const handleApproval=async()=>{
        await axios.put(BASE_URL+`/admin/vefify/counselor/${userId}`,null,{
            headers: {
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
            console.log(res.data)
            navigate('/admin/newrequests')
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <>
        <DashHeader />
        <div className='flex '> 
            <AdminSidepanal />
            <div className='sm:w-full  p-4  flex flex-col items-center'>
                <h2 className='text-2xl text-orange-500 font-bold text-center'>Counsellor Profile Verification</h2>
                <div className=' m-12'>
                <img src={profilePic} className='rounded-full h-48 w-48 shadow-lg border-2 border-orange-500 shadow-slate-400' alt='' />   
                </div>

                {data && (
                    <div className=' grid gap-6 grid-cols-6 w-2/3 '>
                    <div className='col-span-3  h-32 text-end px-4 font-bold '>
                            <h2 className="m-2">Email</h2>
                            <h2 className="m-2">Phone</h2>
                            <h2 className="m-2">Gender</h2>
                            <h2 className="m-2">Qualification</h2>
                            <h2 className="m-2">Year Of Experience</h2>
                            <h2 className="m-2">Language Spoken</h2>
                            <h2 className="m-2">Specialization</h2>

                            <button
                                onClick={handleApproval}
                                className=" w-44 my-5 justify-center rounded-2xl bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            >
                                APPROVE
                            </button>
                    </div>
                    <div className='col-span-3  h-32'>
                            <h2 className="m-2">{data.email}</h2>
                            <h2 className="m-2">{data.phone}</h2>
                            <h2 className="m-2">{data.gender.gender}</h2>
                            <h2 className="m-2">{data.qualification.qualification}</h2>
                            <h2 className="m-2">{data.yoe} Yrs</h2>
                            { data.languages.map((data)=>(
                                <span className='p-3' key={data.id}>{data.language}</span>
                            ))}
                            <h2 className="m-2">{data.specialization.specilization}</h2>
                            <button
                                className="my-5 w-44 justify-center rounded-2xl border-2 border-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-red-500 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            >
                                REJECT
                            </button>
                    </div>

                    <div>
                    

                    </div>
                    </div>
                )}
                
               
            </div>
        </div>
    </>
  )
}

export default ViewProfile
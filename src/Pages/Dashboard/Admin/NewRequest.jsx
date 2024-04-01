import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import axios from 'axios';
import { BASE_URL } from '../../../Utils/const';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function NewRequest() {

    const [TABLE_ROWS , setTableRows]= useState([]);
    const TABLE_HEAD=['NAME' , 'E MAIL ID' , 'PHONE','JOINED ON' ,'ACTION']
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(BASE_URL+'/admin/fetchnewrequests',{
            headers: {
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
            console.log(res)
            setTableRows(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])


    

      const handleVerify=(id)=>{
        navigate(`/admin/request/viewprofile/${id}`)
      }
  return (
    <>
        <DashHeader />
        <div className='flex '> 
            <AdminSidepanal />
            <div className='sm:w-full  p-4'>
            <h2></h2>
            <div className="h-full w-full  rounded-2xl  shadow-orange-200 shadow-sm">
      <table className="w-full min-w-max px-3 table-auto text-center ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-orange-200  p-4">
                <div
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ id,fullname, email, phone ,joinedOn , blocked}, index) => (
            <tr key={fullname} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {fullname}
                </div>
              </td>
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {email}
                </div>
              </td>
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {phone}
                </div>
              </td>
              <td className="p-4">
                <div as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  {joinedOn.slice(0,10)}
                </div>
              </td>
              <td className="p-4 ">
                  <div  variant="small"  className="cursor-pointer border-2 border-orange-500 rounded-2xl font-medium text-orange-500" value={id} onClick={()=>handleVerify(id)}>
                  VERIFY
                  </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
        </div>
    </>
  )
}

export default NewRequest
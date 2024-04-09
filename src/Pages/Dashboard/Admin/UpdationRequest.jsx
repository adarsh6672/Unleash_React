import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import axios from 'axios';
import { BASE_URL } from '../../../Utils/const';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function UpdationRequest() {

    const [TABLE_ROWS , setTableRows]= useState([]);
    const TABLE_HEAD=['NAME' , 'E MAIL ID' , 'PHONE','JOINED ON' ,'ACTION']
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(BASE_URL+'/admin/updation-requests',{
            headers: {
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
            console.log(res.data)
            setTableRows(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])


    

      const handleVerify=(index)=>{
        console.log(TABLE_ROWS[0])
        navigate(`/admin/request/view-updation/`, {state:TABLE_ROWS[0]})
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
          {TABLE_ROWS.map(({ id,user }, index) => (
            <tr key={user.fullname} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {user.fullname}
                </div>
              </td>
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {user.email}
                </div>
              </td>
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {user.phone}
                </div>
              </td>
              <td className="p-4">
                <div as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  {user.joinedOn.slice(0,10)}
                </div>
              </td>
              <td className="p-4 ">
                  <div  variant="small"  className="cursor-pointer border-2 border-orange-500 rounded-2xl font-medium text-orange-500" value={index} onClick={()=>handleVerify(id)}>
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

export default UpdationRequest
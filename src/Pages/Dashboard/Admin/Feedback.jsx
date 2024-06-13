import React from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import AdminSidepanal from '../../../Components/SidePanel/AdminSidePanal'
import axios from 'axios';
import { BASE_URL } from '../../../Utils/const';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Feedback() {

    const [TABLE_ROWS , setTableRows]= useState([]);
    const TABLE_HEAD=['SL NO','PATIENT' , 'COUNSELOR' , 'RATING /5','FEEDBACK' ,'TIME']
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(BASE_URL+'/consultation/admin/get-all-feedbacks',{
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
          {TABLE_ROWS.map(({ patient, counselor, rating ,feedback , timestamp}, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {index+1}
                </div>
              </td>
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {patient}
                </div>
              </td>
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {counselor}
                </div>
              </td>
              <td className="p-4">
                <div variant="small" color="blue-gray" className="font-normal">
                  {rating}
                </div>
              </td>
              <td className="p-4">
                <div as="a" href="#" variant="small" color="blue-gray" className="">
                  {feedback}
                </div>
              </td>
              <td className="p-4">
                <div as="a" href="#" variant="small" color="blue-gray" className="">
                  {timestamp.slice(0,10)}
                </div>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
      {! TABLE_ROWS[0] && (
        <div className='place-items-center'>
            <h1 className='text-center font-bold text-2xl'>No Data Available</h1>

        </div>
          )}
    </div>
        </div>
        </div>
    </>
  )
}

export default Feedback
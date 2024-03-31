import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import Unverified from '../../../Components/SidePanel/Unverified'
import SignUpForm from '../../../Components/Authentication/SignUpForm';
import VerificationForm from '../../../Components/Verification/VerificationForm';
import axios from 'axios';
import { BASE_URL } from '../../../Utils/const';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../../Redux/Slice/UserDataSlice';

function Unverifiedform() {
  const token = localStorage.getItem("token");
  const [uploaded , setUploaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
      axios.get(BASE_URL+'/counselor/verificationstatus',{
        headers: {
          'Authorization':`Bearer ${token}` 
      }
      }).then(res=>{
        console.log(res.data)
        if(res.data==='uploaded'){
          setUploaded(true)
        }else if(res.data==='verified'){
          localStorage.setItem("role","COUNSELOR")
          dispatch(setUserRole('COUNSELOR'))
        }else{
          console.log(res.data);
        }
      }).catch(err=>{
        console.log(err)
      })
  },[]);

  return (
    <>
        <DashHeader/>
        <div className='flex gap-3'>
        <Unverified /> 
        <div className='sm:w-full  p-4 '>
          {!uploaded && (
            <div>
              <VerificationForm />
            </div> 
          )}
            
            {uploaded && (
            <div className='min-h-lvh'>
             file uploaded
            </div> 
          )}
        </div>
        </div>
    </>
  )
}

export default Unverifiedform
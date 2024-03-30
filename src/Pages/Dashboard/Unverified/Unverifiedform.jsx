import React, { useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import Unverified from '../../../Components/SidePanel/Unverified'
import SignUpForm from '../../../Components/Authentication/SignUpForm';
import VerificationForm from '../../../Components/Verification/VerificationForm';

function Unverifiedform() {

  

  return (
    <>
        <DashHeader/>
        <div className='flex gap-3'>
        <Unverified /> 
        <div className='sm:w-full  p-4 '>
          <div>
              <VerificationForm />
          </div>   
          <div>


          </div>
        </div>
        </div>
    </>
  )
}

export default Unverifiedform
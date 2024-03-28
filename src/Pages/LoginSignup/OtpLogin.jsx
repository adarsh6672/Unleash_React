import React from 'react'
import Header from '../../Components/Header'
import { useState, useRef , useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Utils/const';
import { useLocation } from 'react-router-dom';

function OtpLogin({}) {

    const [otp, setOtp] = useState('');
    const inputRefs = useRef([]);
    const [err , setErr] = useState('');

    const location = useLocation();
    const email= location.state;
    const length = 6;
  
    useEffect(() => {
      // Focus on the first input on component mount
      inputRefs.current[0].focus();
    }, []);
  
    const handleChange = (event, index) => {
      const newChar = event.target.value;
  
      // Ensure a single character is entered
      if (newChar.length > 1) {
        return;
      }
  
      setOtp(otp.slice(0, index) + newChar + otp.slice(index + 1));
  
      // Focus on the next input if a valid character is entered
      if (newChar !== '' && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
  
      // Handle Backspace or Delete
      if (newChar === '' && index !== 0) {
        inputRefs.current[index - 1].focus();
      }

      
    };
  
    const handleKeyDown = (event) => {
      // Allow Backspace, Delete, and navigation (Tab, Arrow keys)
      if ([8, 46, 9, 37, 38, 39, 40].includes(event.keyCode)) {
        return;
      }
  
      // Allow only digits or alphanumeric characters (configurable)
      const allowedChars = /^[0-9a-zA-Z]+$/;
      if (!allowedChars.test(event.key)) {
        event.preventDefault();
      }
    };


  const handleVerification =async ()=>{
    if(otp.length===length){
        console.log(otp)
        await axios.post(BASE_URL+'/otp/verify',{otp}).then(res =>{
            console.log(res.data)
            
        }).catch(error =>{
            console.log(error)
        })
    }else{
        setErr("Enter 6 Digit OTP")
    }
  }
    

  return (
    <>
        <Header />
        <div className="h-screen py-20 px-3">
    <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
                <div className="border-2 rounded-2xl  border-orange-300  h-72 py-3  text-center">
                      <h1 className="text-2xl font-bold">OTP Verification</h1>
                      <div className="flex flex-col mt-4">
                          <span>Enter the OTP you received at</span>
                          <span className="font-bold">{email}</span>
                      </div>
                      <div className=' text-red-700 text-center font-bold'>
                            {err && (
                            <h2>{err}</h2>
                            )}
                        </div>
                      
                        <div className="otp-container"> {/* Added a container class */}
                            {Array.from({ length }, (_, index) => (
                                <input
                                key={index}
                                type="text"
                                maxLength={1}
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={otp[index] || ''}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={handleKeyDown}
                                className="m-2 border-2 h-10 w-10 text-center form-control rounded" // Maintained original classes
                                />
                            ))}
                        </div>
                        <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 mb-3 w-28 px-4 rounded-2xl'
                        onClick={handleVerification}>
                            Verify
                        </button>
                      <div className="flex justify-center text-center mt-5">
                          <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></a>
                      </div>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
  )
}

export default OtpLogin
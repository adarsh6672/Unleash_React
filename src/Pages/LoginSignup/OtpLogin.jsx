import React from 'react'
import Header from '../../Components/Header'
import { useState, useRef , useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../Utils/const';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { userLogin } from '../../Redux/Slice/AuthSlice';
import { setUserData } from '../../Redux/Slice/UserDataSlice';

function OtpLogin() {

    const [otp, setOtp] = useState('');
    const inputRefs = useRef([]);
    const [err , setErr] = useState('');
    const [loading , setLoading] = useState(false);

    const dispatch = useDispatch();
    const navig = useNavigate();

    const location = useLocation();
    const email= location.state;
    const length = 6;

    const [ minutes, setMinutes ] = useState(1);
    const [seconds, setSeconds ] =  useState(30);
    const [counter , setCounter] = useState(false);
    const [resend , setResend] = useState(false)
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setCounter(true)
                    clearInterval(myInterval)
                    
                } else {  
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
          
            clearInterval(myInterval);
            
          };
    });

    const handleResend=()=>{
      setResend(!resend);
      axios.post(BASE_URL+'/password/forgot',{
        email:localStorage.getItem("forgotmail")
      }).then(resp =>{
        console.log(resp.data);
      }).catch(error =>{
        console.log(error.response)
      });
    }
  
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
        setLoading(true);
        console.log(otp)
        
        await axios.post(BASE_URL+'/otp/verify',{
          "otp": otp,
          "email": localStorage.getItem("email")
        }).then(res =>{
            console.log(res.data)
            dispatch(setUserData(res.data))
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('role',res.data.role);
            dispatch(userLogin());
            navig("/");
            
        }).catch(error =>{
            console.log(error)
            setLoading(false);
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
                        {!loading && (
                          <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 mb-3 w-28 px-4 rounded-2xl'
                          onClick={handleVerification}>
                              Verify
                          </button>
                        )}
                        { loading && (
                          <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 mb-3 w-28 px-4 rounded-2xl'
                          onClick={handleVerification}>
                               <div
                                className="inline-block h-8 w-8 animate-spin rounded-full text-white border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status">
                                <span
                                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap  !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                >Loading...</span>
                              </div>
                          </button>
                        )}
                        
                        <div className="flex justify-center text-center mt-5">
                      <div className='text-blue-700 font-bold'>
                          { minutes === 0 && seconds === 0
                              ? null
                              : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
                          }
                        </div>
                        {counter && (
                          <div 
                          onClick={handleResend}
                          className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span></div>
                        )}
                          
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
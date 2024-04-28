import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../../Assets/imgs/logo.png'
import { IoLogOut } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../Redux/Slice/AuthSlice';
import {useNavigate} from 'react-router-dom'
import { UseSelector } from 'react-redux';

function DashHeader() {
    const userData = useSelector(state => state.userData.userData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const role = useSelector(state=> state.userData.userRole);

    const logout =()=>{
        dispatch(userLogout());
        navigate("/")
    }

  return (
    <>
         <div className='min-h-24 grid gap-4 sm:grid-cols-12 '>
            <div className='sm:col-span-2'>
                <Link to="/">
                <img
                className="mx-auto h-20 w-auto"
                src={logo}
                alt="Unleash"
                />
                </Link>
            
            </div>
            <div className=' sm:col-span-8'>
                
                <div className='text-end font-bold text-indigo-800 pt-7 text-xl'>
                    <span >{userData.fullname} </span>

                </div>
            </div>
            
                <div className='sm:col-span-2 '>
                <div className='flex justify-evenly pt-6'>
                    <Link to="/notification" className='text-4xl text-orange-500'>
                        <IoMdNotifications />
                    </Link>
                   
                    <div  className='text-4xl text-orange-500 cursor-pointer' onClick={logout}>
                        <IoLogOut />
                    </div>
                    
                </div>
                </div>
        </div>
    </>
  )
}

export default DashHeader
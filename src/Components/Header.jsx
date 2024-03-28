import React from 'react'
import logo from '../Assets/imgs/logo.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
    const isLogin = useSelector(state => state.auth.isLogin)

  return (
    <>
        <div className='min-h-24 grid gap-4 sm:grid-cols-12 border-b-2  border-b-orange-500'>
            <div className='sm:col-span-3'>
                <Link to="/">
                <img
                className="mx-auto h-20 w-auto"
                src={logo}
                alt="Unleash"
                />
                </Link>
            
            </div>
            <div className=' sm:col-span-5'>
                <div className="hidden md:block">
                    <div className="ml-10 flex  justify-end space-x-24 mt-10">
                        <a href="#" className="text-gray-800 hover:text-orange-500 font-bold">Our Counsellors</a>
                        <a href="#" className="text-gray-800 hover:text-orange-500 font-bold">Plan & Pricing</a>
                        <a href="#" className="text-gray-800 hover:text-orange-500 font-bold">Article Hub</a>
                    </div>
                </div>
            </div>
            {!isLogin && (
                <div className='sm:col-span-4 '>
                <div className='flex justify-evenly pt-6'>
                    <Link to="/login">
                    <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 mb-3 w-28 px-4 rounded-2xl'>
                        Log In
                    </button>
                    </Link>
                   
                    <Link to="/signup">
                    <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 mb-3 w-28 px-4 rounded-2xl'>
                        Sign Up
                    </button>
                    </Link>
                    <Link to="/counselorSignup">
                    <button className='bg-white  border-orange-500 border-2 hover:text-orange-400 w-28  mb-3 text-orange-500 font-bold py-2 px-4 rounded-2xl ml-2'>
                        Counselor
                    </button>
                    </Link>
                </div>
                </div>
            )}
            {isLogin && (
                <div className='sm:col-span-4 '>
                <div className='flex justify-evenly pt-6'>
                    <Link to="/dashboard">
                    <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 mb-3 w-48 px-4 rounded-2xl'>
                        My Dashboard
                    </button>
                    </Link>
                   
                </div>
                </div>
            )}
            
        </div>
    </>
  )
}

export default Header
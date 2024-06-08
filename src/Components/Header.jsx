import React from 'react'
import logo from '../Assets/imgs/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {

    const navigate = useNavigate()

    const isLogin = useSelector(state => state.auth.isLogin)
    const role = useSelector(state => state.userData.userRole)
    const [isOpen, setIsOpen] = useState(false);
    const handleRouting = () => {
        if (role === 'USER') {
            navigate("/user/dashboard")
        } else if (role === 'Unverified') {
            navigate("/counselor/profileVerification")
        } else if (role === 'COUNSELOR') {
            navigate("/counselor/dashboard")
        } else if (role === 'ADMIN') {
            navigate("/admin/dashboard")
        } else {
            navigate("/")
        }
    }

    return (
        <>
            <div className='min-h-24 grid gap-4 sm:grid-cols-12 border-b-2  border-b-orange-500'>
                <div className='sm:col-span-3 flex justify-around'>
                    <Link to="/">
                        <img
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt="Unleash"
                        />
                    </Link>
                    {!isLogin &&
                        <div className="relative  sm:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className=" font-bold py-2 px-4  mt-7 text-2xl rounded-md text-orange-500 border-2 border-orange-400 inline-flex items-center"
                            >
                                <GiHamburgerMenu />
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                    <div className="rounded-md bg-white shadow-xs">
                                        {!isLogin &&
                                            <div className=" flex flex-col justify-center gap-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                                                <Link to="/login">
                                                    <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2  w-full px-4 '>
                                                        Log In
                                                    </button>
                                                </Link>

                                                <Link to="/signup">
                                                    <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2  w-full px-4 '>
                                                        Sign Up
                                                    </button>
                                                </Link>
                                                <Link to="/counselorSignup">
                                                    <button className='bg-white  border-orange-500 border-2 hover:text-orange-400 w-full  text-orange-500 font-bold py-2 px-4  '>
                                                        Counselor
                                                    </button>
                                                </Link>
                                            </div>
                                        }


                                    </div>
                                </div>
                            )}
                           
                        </div>
                    }
                     {isLogin &&
                                <div onClick={handleRouting} className='place-content-center sm:hidden'>
                                    <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2  w-full px-4 '>
                                        Dashboard
                                    </button>
                                </div>
                            }
                </div>



                <div className=' sm:col-span-5'>
                    <div className="">
                        <div className="sm:ml-10 flex justify-around  sm:justify-end sm:space-x-24 sm:mt-10 text-sm sm:text-lg  font-bold">
                            <NavLink to='/counsellors'
                                className={({ isActive }) => isActive ? 'text-orange-500 ' : 'text-gray-800 hover:text-orange-500 '}
                            >Our Counsellors</NavLink>
                            <NavLink to='/plan-pricing' className={({ isActive }) => isActive ? 'text-orange-500 ' : 'text-gray-800 hover:text-orange-500 '}
                            >Plan & Pricing</NavLink>
                            <NavLink to='/articlehub' className={({ isActive }) => isActive ? 'text-orange-500 ' : 'text-gray-800 hover:text-orange-500 '}
                            >Article Hub</NavLink>
                        </div>
                    </div>
                </div>
                {!isLogin && (
                    <div className='sm:col-span-4 hidden sm:block'>
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
                    <div className='hidden sm:block sm:col-span-4 '>
                        <div className='flex justify-evenly pt-6'>
                            <div onClick={handleRouting}>
                                <button className='bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 mb-3 w-48 px-4 rounded-2xl'>
                                    My Dashboard
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default Header
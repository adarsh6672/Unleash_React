import React from 'react'
import { NavLink } from 'react-router-dom'
function CounselorSidebar() {
  return (
    <>
        
        <div className='hidden md:block sm:w-1/5 bg-indigo-700 rounded-e-3xl h-screen  text-white font-bold text-xl '>
            <div className='block text-end my-5 '>

                <div className='py-5 '>
                <NavLink
                    to="/counselor/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-24  pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5 pr-5  rounded-l-2xl ml-16'
                        }
                    >
                    Dashboard  
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-32 pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Sessions
                </NavLink>
                </div>

                <div className='py-5 '>
                <NavLink
                    to="/dasboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5  pr-5 bg-white text-indigo-700 rounded-l-2xl pl-2' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Chats
                </NavLink>  
                </div>

                <div className='py-5 '>
                <NavLink
                    to="/dashbard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-24  pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Time Schedule
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashbard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Write Article
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Feedbacks
                </NavLink>
                </div>
                <div className='py-5'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Payments
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Profile
                </NavLink>
                </div>      
            </div>
        </div>
            
        
    </>
  )
}

export default CounselorSidebar
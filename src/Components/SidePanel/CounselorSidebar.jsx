import React from 'react'
import { NavLink } from 'react-router-dom'
function CounselorSidebar() {
  return (
    <>
        
        <div className='hidden md:block sm:w-1/5 bg-indigo-700 rounded-e-3xl min-h-[41.5rem] max-h-fit  text-white font-bold text-xl '>
            <div className='block  my-5 '>

                <div className='py-5 flex'>
                <NavLink
                    to="/counselor/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Dashboard  
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/counselor/sessions"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Sessions
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/counselor/chat"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    My Chats
                </NavLink>  
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/counselor/time-schedule"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Time Schedule
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/counselor/article"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Write Article
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Feedbacks
                </NavLink>
                </div>
                <div className='py-5 flex'>
                <NavLink
                    to="/counselor/payment"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Payments
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/counselor/profile"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
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
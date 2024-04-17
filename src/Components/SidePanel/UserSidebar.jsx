import React from 'react'
import { Link,NavLink } from 'react-router-dom'
function UserSidebar() {
  return (
    <>
        
        <div className='hidden md:block sm:w-1/5 bg-indigo-700 rounded-e-3xl h-lvh text-white font-bold text-xl '>
            <div className='block text-end my-5 '>

                <div className='py-5 '>
                <NavLink
                    to="/user/dashboard"
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
                    Profile
                </NavLink>
                </div>

                <div className='py-5 '>
                <NavLink
                    to="/dasboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5  pr-5 bg-white text-indigo-700 rounded-l-2xl pl-2' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Personal Preference
                </NavLink>  
                </div>

                <div className='py-5 '>
                <NavLink
                    to="/user/sessions"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-24  pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    My Sessions
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashbard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    My Chats
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Counsellors
                </NavLink>
                </div>

               

                
               
                
                
            </div>
        </div>
            
        
    </>
  )
}

export default UserSidebar
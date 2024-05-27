import React from 'react'
import { Link,NavLink } from 'react-router-dom'
function UserSidebar() {
  return (
    <>
        
        <div className='hidden md:block sm:w-1/5 bg-indigo-700 rounded-e-3xl min-h-[41.5rem] max-h-fit text-white font-bold text-xl '>
            <div className='block text-end my-5 '>

                <div className='py-5 flex '>
                <NavLink
                    to="/user/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Dashboard  
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/user/profile"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '                        }
                    >
                    Profile
                </NavLink>
                </div>

                {/* <div className='py-5 flex'>
                <NavLink
                    to="/dasboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '                        }
                    >
                    Personal Preference
                </NavLink>  
                </div> */}

                <div className='py-5 flex'>
                <NavLink
                    to="/user/sessions"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '                        }
                    >
                    My Sessions
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/user/chat"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '                        }
                    >
                    My Chats
                </NavLink>
                </div>

                <div className='py-5 flex'>
                <NavLink
                    to="/counsellors"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '                        }
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
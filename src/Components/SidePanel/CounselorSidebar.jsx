import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { userLogout } from '../../Redux/Slice/AuthSlice';
import { FaBars } from 'react-icons/fa'; // For the menu icon


function CounselorSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const logout = () => {
        dispatch(userLogout());
        navigate("/")
    }
  return (
    <>
        
        <button
                className="sm:hidden fixed  top-7 right-10 z-50 bg-white"
                onClick={toggleSidebar}
            >
                <FaBars size={24} className='text-orange-500' />
            </button>

            <div
                className={`w-3/5 sm:w-1/5  bg-indigo-700 rounded-e-3xl min-h-[41.5rem] max-h-fit text-white font-bold text-xl fixed top-0 sm:static h-full z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
            >
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
                <div className="sm:hidden py-5 flex">
                        <div
                            className='py-1 pr-5 w-full text-start ml-10 rounded-l-2xl'
                            onClick={logout}
                        >
                            Log Out
                        </div>
                    </div>      
            </div>
        </div>
            
        
    </>
  )
}

export default CounselorSidebar
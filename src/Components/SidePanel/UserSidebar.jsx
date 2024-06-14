import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // For the menu icon
import { useDispatch } from 'react-redux';
import { userLogout } from '../../Redux/Slice/AuthSlice';




function UserSidebar() {
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
                className="sm:hidden fixed top-7 right-10 z-50"
                onClick={toggleSidebar}
            >
                <FaBars size={24} className='text-orange-500' />
            </button>

            <div
                className={`w-3/5 sm:w-1/5  bg-indigo-700 rounded-e-3xl min-h-[41.5rem]  text-white font-bold text-xl fixed top-0 sm:static  z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
            >
                <div className="text-end my-5 ">
                    <div className="py-5 flex">
                        <NavLink
                            to="/user/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? 'py-1 w-full text-start px-3 ml-7 bg-white text-indigo-700 rounded-l-2xl'
                                    : 'py-1 pr-5 w-full text-start ml-10 rounded-l-2xl'
                            }
                        >
                            Dashboard
                        </NavLink>
                    </div>

                    <div className="py-5 flex">
                        <NavLink
                            to="/user/profile"
                            className={({ isActive }) =>
                                isActive
                                    ? 'py-1 w-full text-start px-3 ml-7 bg-white text-indigo-700 rounded-l-2xl'
                                    : 'py-1 pr-5 w-full text-start ml-10 rounded-l-2xl'
                            }
                        >
                            Profile
                        </NavLink>
                    </div>

                    <div className="py-5 flex">
                        <NavLink
                            to="/user/sessions"
                            className={({ isActive }) =>
                                isActive
                                    ? 'py-1 w-full text-start px-3 ml-7 bg-white text-indigo-700 rounded-l-2xl'
                                    : 'py-1 pr-5 w-full text-start ml-10 rounded-l-2xl'
                            }
                        >
                            My Sessions
                        </NavLink>
                    </div>

                    <div className="py-5 flex">
                        <NavLink
                            to="/user/chat"
                            className={({ isActive }) =>
                                isActive
                                    ? 'py-1 w-full text-start px-3 ml-7 bg-white text-indigo-700 rounded-l-2xl'
                                    : 'py-1 pr-5 w-full text-start ml-10 rounded-l-2xl'
                            }
                        >
                            My Chats
                        </NavLink>
                    </div>

                    <div className="py-5 flex">
                        <NavLink
                            to="/counsellors"
                            className={({ isActive }) =>
                                isActive
                                    ? 'py-1 w-full text-start px-3 ml-7 bg-white text-indigo-700 rounded-l-2xl'
                                    : 'py-1 pr-5 w-full text-start ml-10 rounded-l-2xl'
                            }
                        >
                            Counsellors
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
    );
}

export default UserSidebar;

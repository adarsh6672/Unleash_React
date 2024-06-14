import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { userLogout } from '../../Redux/Slice/AuthSlice';
import { FaBars } from 'react-icons/fa'; // For the menu icon


function AdminSidepanal() {
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
                className={`w-3/5 sm:w-1/5  bg-indigo-700 rounded-e-3xl min-h-[41.5rem]  text-white font-bold text-xl fixed top-0 sm:static  z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } sm:translate-x-0`}
            >
                <div className='block   py-5 '>

                    <div className=' flex'>
                        <NavLink
                            to="/admin/dashboard"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Dashboard
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/patients"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Patients
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/counsellors"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Verified Counsellors
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/newrequests"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Verification Requests
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/updation-requests"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Updation Requests
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/bookings"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Bookings
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/feedback"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Feedbacks
                        </NavLink>
                    </div>
                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/transactions/counselor"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Transactions
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/payments"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Payments Process
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/article/manage"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Manage Articles
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/promocode"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Promo Code
                        </NavLink>
                    </div>

                    <div className='py-2 flex'>
                        <NavLink
                            to="/admin/plans"
                            className={({ isActive }) =>
                                isActive ? 'py-1  w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 w-full text-start ml-10  rounded-l-2xl '
                            }
                        >
                            Plan Manage
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

export default AdminSidepanal
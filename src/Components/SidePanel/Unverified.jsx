import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { userLogout } from '../../Redux/Slice/AuthSlice';
import { FaBars } from 'react-icons/fa'; // For the menu icon

function Unverified() {
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
                <div className='block text-end my-5 '>

                    <div className='py-5 '>
                        <NavLink
                            to="/counselor/profileverification"
                            className={({ isActive }) =>
                                isActive ? 'py-1 my-5  pl-3 pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5  pl-3 pr-5 bg-white text-indigo-700 rounded-l-2xl'
                            }>
                            Document Verification
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

export default Unverified
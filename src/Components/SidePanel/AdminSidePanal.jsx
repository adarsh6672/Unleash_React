import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminSidepanal() {
  return (
    <>
        
        <div className='hidden md:block sm:w-1/5 bg-indigo-700 rounded-e-3xl min-h-[41.5rem] max-h-fit text-white font-bold text-xl '>
            <div className='block text-end my-5 '>

                <div className='py-5 '>
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-24  pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5 pr-5  rounded-l-2xl ml-16'
                        }
                    >
                    Dashboard  
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/admin/patients"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-32 pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Patients
                </NavLink>
                </div>

                <div className='py-5 '>
                <NavLink
                    to="/admin/counsellors"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5  pr-5 bg-white text-indigo-700 rounded-l-2xl pl-2' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Verified Counsellors
                </NavLink>  
                </div>

                <div className='py-5 '>
                <NavLink
                    to="/admin/newrequests"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-2  pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Verification Requests
                </NavLink>
                </div>

                <div className='py-5 '>
                <NavLink
                    to="/admin/updation-requests"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-2  pr-5 bg-white text-indigo-700 rounded-l-2xl ' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Updation Requests
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashbard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Bookings
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
                    Transactions
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Payments Process
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Manage Articles
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5 pl-28 pr-5 bg-white text-indigo-700 rounded-l-2xl ml-16' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Promo Code
                </NavLink>
                </div>

                <div className='py-5'>
                <NavLink
                    to="/admin/plans"
                    className={({ isActive }) =>
                        isActive ? 'py-1 my-5  pr-5 bg-white text-indigo-700 rounded-l-2xl pl-2' : 'py-1 my-5  pr-5  rounded-l-2xl pl-2'
                        }
                    >
                    Plan Manage
                </NavLink>
                </div>

             
               

                
               
                
                
            </div>
        </div>
            
        
    </>
  )
}

export default AdminSidepanal
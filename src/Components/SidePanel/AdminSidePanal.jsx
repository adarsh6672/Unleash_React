import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminSidepanal() {
  return (
    <>
        
        <div className='hidden md:block sm:w-1/5 bg-indigo-700 rounded-e-3xl min-h-[41.2rem] max-h-fit text-white font-bold text-xl '>
            <div className='block   py-5 '>

                <div className=' flex'>
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Dashboard  
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/patients"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Patients
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/counsellors"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Verified Counsellors
                </NavLink>  
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/newrequests"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Verification Requests
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/updation-requests"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Updation Requests
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/bookings"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Bookings
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/dashb  ard"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Feedbacks
                </NavLink>
                </div>
                <div className='py-2 flex'>
                <NavLink
                    to="/admin/transactions/counselor"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Transactions
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/payments"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Payments Process
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/article/manage"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Manage Articles
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/promocode"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
                        }
                    >
                    Promo Code
                </NavLink>
                </div>

                <div className='py-2 flex'>
                <NavLink
                    to="/admin/plans"
                    className={({ isActive }) =>
                        isActive ? 'py-1  min-w-full text-start px-3 ml-7  bg-white text-indigo-700 rounded-l-2xl ' : 'py-1  pr-5 min-w-full text-start ml-10  rounded-l-2xl '
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
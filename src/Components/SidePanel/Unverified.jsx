import React from 'react'
import { NavLink } from 'react-router-dom'
function Unverified() {

  return (
    <>
    
    <div className='hidden md:block sm:w-1/5 bg-indigo-700 rounded-e-3xl h-auto text-white font-bold text-xl '>
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


                

               

                
               
                
                
            </div>
        </div>
            
        
    </>
    )
}

export default Unverified
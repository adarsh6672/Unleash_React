import React from 'react';
import DashHeader from '../../../Components/SidePanel/DashHeader';
import Unverified from '../../../Components/SidePanel/Unverified';
import { FaRegCheckCircle } from "react-icons/fa";



const Submitted = () => {
    return (
        <>
            <DashHeader />
            <div className='flex gap-3'>
                <Unverified />
                <div className='sm:w-full  p-4 flex justify-center min-h-lvh'>
                    <div className=' w-3/5 bg-slate-100 rounded-xl shadow-md shadow-slate-200 h-60 p-5'>
                        <h1 className='text-center font-bold text-2xl text-orange-500'>Document Verification Status</h1>
                        <div className='p-5 flex'>
                            <FaRegCheckCircle className='mt-2 text-green-600 mr-10 text-xl'/>
                            <h1 className='text-xl font-bold text-indigo-800'>Request Submitted</h1>
                        </div>
                        <div className='p-5 flex' >
                            <FaRegCheckCircle className='mt-2 text-slate-300 mr-10 text-xl'/>   
                            <h1 className='text-xl font-bold text-slate-300'>Verification Pending</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Submitted;

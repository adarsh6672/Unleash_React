import React from 'react';
import Header from '../../Components/Header';

const OpenProfile = () => {
    return (
        <>
            <Header />
            <div className='sm:grid grid-cols-12 p-10 pt-10 gap-5 h-96'>
                <div className=' col-span-3 '>
                    <div className='bg-slate-200 w-80 rounded-lg content-center pt-8 flex justify-center items-center flex-col'>
                        <img src="https://imgs.search.brave.com/ajrtLO7JlPPp58C4WBRvpPOZI2WqA5IYSBnfqXCohR0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/ZW1hbGUtZG9jdG9y/LWhvc3BpdGFsXzIz/LTIxNDg4Mjc3NjAu/anBnP3NpemU9NjI2/JmV4dD1qcGc" alt=""
                        className='h-64 w-64 object-cover rounded-lg' />
                        <h1 className='text-center font-bold pt-5 '>Name</h1> 
                        <h1 className='p-5'>M Phil Phsycology</h1>
                        <button className='bg-orange-500 text-white rounded-lg text-center p-2 mb-10'>
                        Book A Session
                    </button>
                    </div>                    
                </div>
                <div className=' col-span-9 sm:grid grid-cols-2 gap-10'>
                    <div className=''>

                    </div>
                    <div className=''>
                        
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default OpenProfile;

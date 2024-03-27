import React from 'react'
import logo from '../Assets/imgs/logo.png'
function Header() {
  return (
    <>
        <div className='min-h-24 grid gap-4 sm:grid-cols-12 border-b-2  border-b-orange-500'>
            <div className='sm:col-span-4'>
            <img
            className="mx-auto h-20 w-auto"
            src={logo}
            alt="Unleash"
            />
            </div>
            <div className=' sm:col-span-5'>
                <div className="hidden md:block">
                    <div className="ml-10 flex  justify-end space-x-24 mt-16">
                        <a href="#" className="text-gray-800 hover:text-orange-800 font-bold">Home</a>
                        <a href="#" className="text-gray-800 hover:text-orange-800 font-bold">About</a>
                        <a href="#" className="text-gray-800 hover:text-orange-800 font-bold">Services</a>
                        <a href="#" className="text-gray-800 hover:text-orange-800 font-bold">Contact</a>
                    </div>
                </div>
            </div>
            <div className='sm:col-span-3'></div>
        </div>
    </>
  )
}

export default Header
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Assets/imgs/logo.png'
import { FaLocationDot } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";



function Footer() {
  return (
    <>
        <div className='sm:grid grid-cols-4 gap-3 bg-indigo-800 p-5'>
            <div className='col-span-1 text-white '>
                <Link to="/">
                    <img
                    className="mx-auto h-24 "
                    src={logo}
                    alt="Unleash"
                    />
                </Link>
                <div className='flex p-5 justify-center'><FaLocationDot /> <span className='ml-5'>Location</span></div>
                <div className='flex p-5 justify-center'><MdAlternateEmail /> <span className='ml-5'>unleashonlinein@gmail.com</span></div>
                <div className='flex p-5 justify-center'><FaPhoneAlt /> <span className='ml-5'>+91 9400686672</span></div>
            </div>
            <div className='col-span-1 text-white text-center'>
                <h1 className='text-xl font-bold mb-20'>Quick Links</h1>
                <ul className='text-lg leading-10'>
                    <li>For Therapists</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className='col-span-1 text-white text-center'>
                <h1 className='text-xl font-bold mb-20'>Legal Stuff</h1>
                <ul className='text-lg leading-10'>
                    <li>Disclaimer</li>
                    <li>Privacy & Policy</li>
                    <li>Terms Of Service</li>
                </ul>
            </div>
            <div className='col-span-1 text-center pt-10'>
                        <input className='rounded-xl w-72 h-10 p-2'
                        placeholder='Enter Phone Number'
                         type="text" />
                        <button className='bg-orange-500 rounded-lg w-48 m-10 p-2 text-white font-bold'>
                            Get Call Back
                        </button>

                    <div className='flex justify-around text-white text-2xl'>
                        <FaFacebook /> <FaInstagram /> <FaYoutube /> <BsTwitterX />
                    </div>
            </div>
        </div>
    </>
  )
}

export default Footer
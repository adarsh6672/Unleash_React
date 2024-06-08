import React from 'react'
import Header from '../../Components/Header'
import image from '../../Assets/imgs/home1.jpg'
import lapImage from '../../Assets/imgs/image2.jpg'
import { FaVideo } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaBusinessTime } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Footer from '../../Components/Footer';
import Feedbacks from '../../Components/Feedbacks/Feedbacks';
import { useNavigate } from 'react-router-dom'



function Home() {
  const nav = useNavigate();
  return (
    <>
      <Header />
      <div className='h-52 pb-14 md:h-auto bg-right bg-no-repeat bg-cover sm:grid grid-cols-12' style={{ backgroundImage: `url(${image})` }}>

        <div className='hidden ml-10 lg:mt-28 md:block lg:col-span-4 md:col-span-6 py-6  max-h-72 px-12  w-auto6 mt-10 rounded-2xl opacity-85 bg-white text-center'>
          <h1 className='md:text-2xl lg:text-orange-400 text-4xl mb-6 font-bold '>Talk . Resolve . Heal </h1>
          <h1 className='md:text-md lg:text-lg font-bold text-left '> Online Counselling Therapy With Top Phsycologists</h1>
          <h1 className='md:text-sm lg:text-lg font-bold text-left  py-4'>  Anytime , Anywhere , Any Device.</h1>
          <button

            className="flex w-32  justify-center rounded-2xl bg-orange-400  py-2 text-sm font-semibold  text-white shadow-sm shadow-slate-700 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Get Started
          </button>
        </div>
      </div>
      <div className='block md:hidden px-5 text-center  text-black sm:h-72  w-full'>
        <h1 className='text-2xl text-orange-400 font-bold  '>Talk . Resolve . Heal </h1>
        <h1 className='text-md lg:text-lg font-bold  '> Online Counselling Therapy With Top Phsycologists</h1>
        <h1 className='text-sm lg:text-lg font-bold   py-4'>  Anytime , Anywhere , Any Device.</h1>
        <button

          className="w-32  justify-center rounded-2xl bg-orange-400  py-1.5 text-sm font-semibold  text-white shadow-sm shadow-slate-700 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          Get Started
        </button>
      </div>
      <div className='flex justify-center '>
        <h1 className='font-bold text-xl sm:text-3xl text-center border-b-4 border-orange-400 pb-2  max-w-lg mt-8'>Choose Help . Not Suffering</h1>
      </div>
      <div className='sm:grid grid-cols-12 gap-4 mt-5 sm:mt-20'>
        <div className='col-span-6  text-center'>
          <img src={lapImage} className=' w-3/4 rounded-2xl mx-auto' alt="" />
          <div>
            <button

              className="w-auto m-5 sm:mt-10  justify-center rounded-xl bg-orange-400  p-2.5 text-lg font-medium  text-white shadow-sm shadow-slate-700 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              onClick={() => nav("/counsellors")}
            >
              View Our Counsellors
            </button>
          </div>
        </div>
        <div className='col-span-6  px-10 '>
          <h1 className='font-bold text-xl sm:text-2xl '>Counselling Therapy Sessions With Licensed & Verified Experts</h1>
          <h1 className='text-sm sm:text-xl font-medium text-gray-600 pt-5'>Highly qualified team of some of the best names in psychology
            who deliver improved well-being to you. Carefully vetted through
            a rigorous selection process. Trained and experienced in
            all psychotherapy techniques.
          </h1>
          <div className='flex justify-around m-10 text-orange-500 text-5xl'>
            <div className=''><FaVideo /><span className='text-black text-lg  '>Video </span></div>
            <div className=''><FaMicrophone /><span className='text-black text-lg  '>Audio </span></div>
            <div className=''><IoMdChatbubbles /><span className='text-black text-lg  '>Chat </span></div>
          </div>

          <div className='font-bold text-center text-xl sm:text-3xl '>
            English And All Regional Indian Languages
            100% Private & Secure Platform
            24/7 Support
          </div>
        </div>
      </div>
      <div className='bg-gradient-to-b from-white to-slate-300 '>
        {/* icons */}
        <div className='flex justify-around '>
          <h1 className='font-bold text-2xl md:text-3xl text-center border-b-4 border-orange-400 pb-2  max-w-lg mt-8'>How It Works</h1>
        </div>
        <div className='flex justify-around  sm:text-6xl text-orange-400 p-10 '>
          <div className=''>
            <div className='rounded-full border-4 border-indigo-800 p-3 max-w-fit my-5'>
              <FaUser />
            </div>
            <p className='sm:text-xl text-sm text-black text-center'>Select</p>
            <p className='sm:text-xl text-sm text-black text-center'>Counselor</p>
          </div>

          <div className='text-indigo-800 my-5'>
            <FaArrowRight />
          </div>

          <div>
            <div className='rounded-full border-4 border-indigo-800 p-3 max-w-fit my-5'>
              <BsCalendar2DateFill />
            </div>
            <p className='sm:text-xl text-sm text-black '>Schedule</p>
            <p className='sm:text-xl text-sm text-black text-center'>Time & Confirm</p>
          </div>

          <div className='text-indigo-800 my-5'>
            <FaArrowRight />
          </div>

          <div>
            <div className='rounded-full border-4 border-indigo-800 p-3 max-w-fit my-5'>
              <IoMdChatbubbles />
            </div>
            <p className='sm:text-xl text-sm text-black text-center'>Start</p>
            <p className='sm:text-xl text-sm text-black text-center'>Session</p>
          </div>

          <div className='text-indigo-800 my-5'>
            <FaArrowRight />
          </div>

          <div>
            <div className='rounded-full border-4 border-indigo-800 p-3 max-w-fit my-5'>
              <FaBusinessTime />
            </div>
            <p className='sm:text-xl text-sm text-black text-center'>Re Schedule</p>
            <p className='sm:text-xl text-sm text-black text-center'>If Needed</p>
          </div>
        </div>

        
        <div className='flex justify-around relative z-0'>
          <h1 className='font-bold text-xl md:text-3xl text-center border-b-4 border-orange-400 pb-2 bg-transparent max-w-lg m-8'>What People Says About Unleash...!</h1>
        </div>
        <div>
        <div className='hidden relative sm:flex justify-start pr-24'>
          <div className='absolute rounded-full h-32 w-32 ml-56 bg-orange-500'></div>
        </div>
        <div className='hidden relative sm:flex justify-end pb-24 sm:pl-24'>
          <div className='absolute rounded-full h-44 w-44 mr-10 bg-indigo-800 z-0'></div>
        </div>
        </div>
        

        <Feedbacks />
      </div>
      <Footer />
    </>
  )
}

export default Home
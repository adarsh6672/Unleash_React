import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Utils/const';
import Footer from '../../Components/Footer';

function PlanPricing() {
    const navigate = useNavigate()
    const[plans , setPlans] = useState([])
    

    useEffect(()=>{
        axios.get(BASE_URL+'/plan/public/get-all-plans').then(res=>{
            console.log(res.data)
            setPlans(res.data);
        }).catch(err=>{
        console.log(err)
        })
    },[])


    const handlePlan=(item)=>{
        const plan= item;
        console.log(plan)
        navigate('/user/payment',{state:plan})
    }
  return (
   <>
    <Header/>
    <div className='flex justify-center'>
        <h1 className='font-bold text-3xl text-center border-b-4 border-orange-400 pb-2  max-w-lg mt-8'>Find A Plan That's Right For You</h1>
    </div>

    <div className='sm:grid grid-cols-12 gap-14 px-10 pb-14'>
        {plans && plans.map((item, index)=>(
             <div className='col-span-4 bg-slate-100 p-5 rounded-2xl shadow-md shadow-slate-300 mt-6 '>
                <img src={item.iconUrl} alt="" className='h-48 w-48 mx-auto rounded-xl ' />
                <h1 className='text-center text-orange-500 font-bold text-2xl mt-3'>{item.planName}</h1>
                <h1 className='text-center text-lg mt-3 text-indigo-800'>{item.noOfSession} Sessions</h1>
                <h1 className='text-center text-orange-500  text-xl mt-6' >What To Expect ?</h1>
                <p className='text-center px-10'>{item.description}</p>

                <h1 className='text-center text-indigo-800 font-bold text-3xl mt-6'>₹ {item.price}</h1>

                <div className='text-center bg-orange-500 w-1/2 mx-auto font-semibold p-1.5  rounded-2xl text-white shadow-md shadow-slate-400 mt-6 cursor-pointer'
                onClick={()=>handlePlan(item)}>
                    Buy Now
                </div>
             </div>
             
        ))}
    </div>
    <Footer/>
   </>
  )
}

export default PlanPricing

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../../../Utils/const';
import useRazorpay from "react-razorpay";
import Header from '../../../Components/Header';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {

    const token = localStorage.getItem("token")
    const [Razorpay] = useRazorpay()
    const [userData , setUserData] = useState();
    const location = useLocation()
    const plan= location.state;
    const navigate = useNavigate();
    const [error , setError] = useState();

    const [promo , setPromo]= useState(0)
    const [final , setFinal] = useState(plan.price);

    useEffect(()=>{
        axios.get(BASE_URL+'/user/get-user-data',{
            headers :{
                'Authorization':`Bearer ${token}`
            }
        }).then(res=>{
            setUserData(res.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const createOrder = async () => {
        return await axios.get(BASE_URL+'/consultation/subscription/payment/'+final*100, {
            headers :{
                'Authorization':`Bearer ${token}`
            }
    }).then(res=>{
        console.log(res)
        return res.data
    })
    .catch(err=> console.log(err))
    }
    const handlepay = async () => {
        const order = await createOrder();
      
        const options = {
          key: "rzp_test_8b6GHpvbMnFOEM",
          amount: final*100, 
          currency: "INR",
          name: "Unleash",
          description: "Test Transaction",
          image: "https://res.cloudinary.com/datji9d5p/image/upload/v1713167134/unleash/logo_copy_abkdvq.png",
          order_id: order, 
          handler: function (response) {
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
            console.log(response)
            axios.put(BASE_URL+'/consultation/subscription/payment/update',{
                    paymentId: response.razorpay_payment_id,
                    orderId : response.razorpay_order_id,
                    planId : plan.id
            },{
                headers :{
                    'Authorization':`Bearer ${token}`
                }
            }).then(res=>{
                navigate('/counsellors')
            }).catch(err=>{
                console.log(err)
                setError("Sorry...Payment Failed....!")
            })
          },
          prefill: {
            name: userData.fullname,
            email: userData.email,
            contact: userData.phone,
          },
          notes: {
            address: "",
          },
          theme: {
            color: "#f97316",
          },
        };
        
      
        const rzp1 = new Razorpay(options)
      
        rzp1.on("payment.failed", function (response) {
        //   alert(response.error.code);
        //   alert(response.error.description);
        //   alert(response.error.source);
        //   alert(response.error.step);
        //   alert(response.error.reason);
        //   alert(response.error.metadata.order_id);
        //   alert(response.error.metadata.payment_id);
        });
      
        rzp1.open();
      };

 

  return (
   <>
    <Header />
    <div className='flex justify-center'>
        <h1 className='font-bold text-3xl text-center border-b-4 border-orange-400 pb-2  max-w-lg mt-8'>Order Summery</h1>
    </div>
    {error && (
        <h1 className='text-center text-red-500 font-bold text-xl'>{error}</h1>
    )}
    {userData && (
    <div className=' grid gap-6 grid-cols-6 w-2/3 mx-auto mt-10 text-xl border-b-2 border-black'>
        <div className='col-span-3  h-32 text-end px-4  '>
            <h1>Full Name  </h1>
            <h1 className='mt-5'>Phone Number  </h1>
           

        </div>
        <div className='col-span-3  h-32 text-start px-4  text-slate-600'>
            <h1>{userData.fullname}</h1>
            <h1 className='mt-5'>{userData.phone} </h1>
           
        </div>
    </div>
    )}
    <div className='flex justify-center p-10 border-b-2 border-black w-2/3 mx-auto'>
        <h1 className='my-auto mx-5'>Promo Code If Any</h1>
        <input type="text"  className='w-1/3 my-auto mx-5' />
        
        <button className='my-auto mx-5 bg-indigo-800 text-white font-bold p-2 w-1/6'>Apply</button>
        
    </div>
    <div className=' grid gap-6 grid-cols-6 w-2/3 mx-auto py-5 text-xl border-b-2 border-black'>
        <div className='col-span-3  h-32 text-end px-4  '>
            <h1>Total Amount  </h1>
            <h1 className='my-5'>Promocode Discount  </h1>
            <h1 className=''>Final Amount  </h1>

        </div>
        <div className='col-span-3  h-32 text-start px-4  font-bold text-black'>
            <h1>₹ {plan.price}</h1>
            <h1 className='mt-5'>₹ {promo}</h1>
            <h1 className='mt-5'>₹ {final}</h1> 
        </div>
    </div>
    <div className='bg-orange-500 cursor-pointer w-fit mx-auto text-center p-2 mt-5 w-1/5 rounded-lg text-white font-bold shadow-lg shadow-slate-300' onClick={handlepay} >Pay Now</div>
   </>
  )
}

export default Payment

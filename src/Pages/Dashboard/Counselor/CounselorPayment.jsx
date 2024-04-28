import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { useSelector } from 'react-redux'
import { AxiosInstance } from '../../../Utils/AxiosInstance'
import { RAZORPAY_API_KEY, RAZORPAY_API_SECRET } from '../../../Utils/const'
import RazorpayX from 'razorpayx'
import axios from 'axios'



function CounselorPayment() {


    const userData = useSelector(state => state.userData.userData)
    console.log(userData)
    const [accDetails, setAccDetails] = useState()

    const apiKey = RAZORPAY_API_KEY
    const apiSecret = RAZORPAY_API_SECRET


    const data = {
        "name": userData.fullname,
        "email": userData.email,
        "contact": userData.phone,
        "type": "employee",
        "reference_id": userData.id
    }

    useEffect(() => {

        AxiosInstance.get('/consultation/counselor/get-account-details')
            .then(res => {
                console.log(res)
                setAccDetails(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, []);

    const handleCreateContact = async () => {
        const url = 'https://api.razorpay.com/v1/contacts';
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${btoa(`${apiKey}:${apiSecret}`)}`
                }
            });
    
            console.log(response.data);
        } catch (error) {
            console.error('Error creating contact:', error);
        }
    }
    // Check if running in a Node.js environment
    if (typeof window === 'undefined') {
        const { Buffer } = require('buffer');
        global.Buffer = Buffer;
    }


    return (
        <>
            <DashHeader />
            <div className='flex '>
                <CounselorSidebar />
                <div className='sm:w-full  p-4  '>
                    <div>

                    </div>
                    {!accDetails && (
                        <div className=' w-2/3 mx-auto  text-center bg-gradient-to-r from-orange-300 to-indigo-300 rounded-lg shadow-lg shadow-slate-300 p-10'>
                            <h1 className='font-bold text-2xl pb-10'>Not Yet Added Your Account Details ...? </h1>
                            <button className=' bg-indigo-800 text-white p-2 text-center rounded-md' onClick={handleCreateContact} >Add Account Details</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CounselorPayment

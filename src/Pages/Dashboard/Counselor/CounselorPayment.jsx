import React, { useEffect, useState } from 'react'
import DashHeader from '../../../Components/SidePanel/DashHeader'
import CounselorSidebar from '../../../Components/SidePanel/CounselorSidebar'
import { useSelector } from 'react-redux'
import { AxiosInstance } from '../../../Utils/AxiosInstance'
import { RAZORPAY_API_KEY, RAZORPAY_API_SECRET } from '../../../Utils/const'
import RazorpayX from 'razorpayx'
import axios from 'axios'
import Submitted from '../Unverified/Submitted';



function CounselorPayment() {


    const userData = useSelector(state => state.userData.userData)
    console.log(userData)
    const [accNo, setAccNo] = useState('')
    const [confAccNo, setConfAccNo] = useState('')
    const [ifc, setIfc] = useState('')
    const [accDetails, setAccDetails] = useState()
    const [error, setError] = useState()
    const [submitted , setSubmitted]= useState(false)

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
    }, [submitted]);

    const validation = () => {
        setError()
        const regex = /^[a-zA-Z0-9]{5,35}$/;

        if (accNo !== confAccNo) {
            setError('Account Number and Confirm Account Number is not matching...!')
            return false
        }
        if (!regex.test(accNo)) {
            setError('Invalid Account Number')
            return false
        }
        if (ifc.length !== 11) {
            setError('IFC Code Should be 11 ')
            return false
        }
        return true
    }

    const handleCreateContact = async () => {
        const data = {
            name: userData.fullname,
            email: userData.email,
            contact: userData.phone,
            referenceId: userData.id,
            accountNo: accNo,
            ifcCode:ifc
        }
        if(validation()){
            await AxiosInstance.post('/consultation/payment/create-contact', data)
            .then(res => {
                console.log(res)
                setSubmitted(!submitted)
            }).catch(err => {
                console.log(err)
            })
        }
        

    }

    return (
        <>
            <DashHeader />
            <div className='flex '>
                <CounselorSidebar />
                <div className='sm:w-full  p-4  '>
                    
                    {!accDetails && (
                        <div className=' w-2/3 mx-auto  text-center bg-slate-100 rounded-lg shadow-lg shadow-slate-300 p-10'>
                            <h1 className='font-bold text-2xl pb-10'>Register Your Account Details </h1>
                            {error && (
                                <div className='p-5'>
                                    <h1 className='bg-red-200  text-center text-red-700'>{error}</h1>
                                </div>
                            )}
                            <div>
                                <div className='flex justify-between p-2 '>
                                    <label htmlFor="">Account No :</label>
                                    <input type="text" value={accNo} onChange={(e) => setAccNo(e.target.value)} className='w-2/3 rounded-2xl' />
                                </div>
                                <div className='flex justify-between p-2'>
                                    <label htmlFor="">Confirm Account No :</label>
                                    <input type="text" value={confAccNo} onChange={(e) => setConfAccNo(e.target.value)} className='w-2/3 rounded-2xl' />
                                </div>
                                <div className='flex justify-between p-2'>
                                    <label htmlFor="">IFC Code :</label>
                                    <input type="text" value={ifc} onChange={(e) => setIfc(e.target.value)} className='w-2/3 rounded-2xl' />
                                </div>
                            </div>
                            <button className=' bg-indigo-800 text-white p-2 m-3 text-center rounded-md' onClick={handleCreateContact} >Add Account Details</button>
                        </div>
                    )}

                    {accDetails && (
                        <div className=' w-2/3 mx-auto  text-center bg-slate-100 rounded-lg shadow-lg shadow-slate-300 p-5'>
                        <h1 className='font-bold text-2xl pb-10 '> Your Account Details </h1>
                        
                        <div className='w-1/2 mx-auto'>
                            <div className='flex justify-between p-2 '>
                                <h1>Account Number :</h1>
                                <h1>{accDetails.accountNo}</h1>
                            </div>
                            <div className='flex justify-between p-2 '>
                                <h1>IFC Code :</h1>
                                <h1>{accDetails.ifcCode}</h1>
                            </div>
                            <div className='flex justify-between p-2 '>
                                <h1>Account Holder :</h1>
                                <h1>{userData.fullname}</h1>
                            </div>
                            
                        </div>
                        <button className=' bg-indigo-800 text-white p-2 m-3 text-center rounded-md' >Edit  Details</button>
                    </div>
                        
                    )}
                </div>
            </div>
        </>
    )
}

export default CounselorPayment

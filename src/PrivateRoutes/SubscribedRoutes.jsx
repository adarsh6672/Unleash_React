import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AxiosInstance } from '../Utils/AxiosInstance';

const SubscribedRoutes = ({children}) => {
    const token = localStorage.getItem("token")
    const [isSubscribed , setSubscribed] = useState(null);
    useEffect(()=>{
        AxiosInstance('/consultation/subscription/check-Subscription').then(res=>{
           setSubscribed(res.data)
           console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    })

    if (isSubscribed !== null) {
        return isSubscribed ? children : <Navigate to='/plan-pricing'/>;
    } else {
        return <div className='h-screen'>Loading...</div>;
    }
    
}

export default SubscribedRoutes;

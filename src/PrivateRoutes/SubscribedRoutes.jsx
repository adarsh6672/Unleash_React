import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../Utils/const';
import { Navigate } from 'react-router-dom';

const SubscribedRoutes = ({children}) => {
    const token = localStorage.getItem("token")
    const [isSubscribed , setSubscribed] = useState(null);
    useEffect(()=>{
        axios.get(BASE_URL+'/consultation/subscription/check-Subscription',{
            headers: {
                'Authorization':`Bearer ${token}` 
            }
        }).then(res=>{
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

import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const Unautherized = ({children}) => {
 
    const isLogin = useSelector(state=> state.auth.isLogin);
    
    
    if(!isLogin){
        return children
    }else{
        return <Navigate to="/"/> }
  return (
    <div>Unverified</div>
  )
}

export default Unautherized
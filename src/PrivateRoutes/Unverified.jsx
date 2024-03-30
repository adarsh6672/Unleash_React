import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const Unverified = ({children}) => {
    const role = useSelector(state=> state.userData.userRole);
    console.log(role);
    
    if(role==='Unverified'){
        return children
    }else{
        return <Navigate to="/"/> }
  return (
    <div>Unverified</div>
  )
}

export default Unverified
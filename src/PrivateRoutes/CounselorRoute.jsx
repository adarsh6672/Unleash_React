import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
function CounselorRoute({children}) {

  const role = useSelector(state=> state.userData.userRole);
    console.log(role);
    
    if(role==='COUNSELOR'){
        return children
    }else{
        return <Navigate to="/"/> }
  
  
}

export default CounselorRoute
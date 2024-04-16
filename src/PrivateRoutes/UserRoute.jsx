import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const UserRoute = ({children}) => {
  
  const isLogin = useSelector(state=> state.auth.isLogin);
    const role = useSelector(state=> state.userData.userRole);
    console.log(role);
    const a = 'USER'
    if(role==='USER'){
        return children
    }else if(!isLogin){
        return<Navigate to='/login'/>
    }
    else{
        return <Navigate to="/"/>
       }

}

export default UserRoute
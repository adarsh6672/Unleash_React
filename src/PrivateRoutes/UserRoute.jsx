import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const UserRoute = ({children}) => {

    const role = useSelector(state=> state.userData.userRole);
    console.log(role);
    const a = 'USER'
    if(role==='USER'){
        return children
    }else{
        return <Navigate to="/"/> }
  return (
    <div></div>
  )
}

export default UserRoute
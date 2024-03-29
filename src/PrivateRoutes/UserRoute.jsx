import React from 'react'
import { useSelector } from 'react-redux'
import UserDataSlice from '../Redux/Slice/UserDataSlice'
import { Navigate } from 'react-router-dom'
const UserRoute = ({children}) => {

    const role = useSelector(state=> state.userData.userData.role);
    console.log(role);
    const a = 'USER'
    if(role==='USER'){
        return children
    }else{
        return <Navigate to="/"/> }
  return (
    <div>UserRoute</div>
  )
}

export default UserRoute
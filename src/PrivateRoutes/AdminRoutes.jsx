import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoutes = ({children}) => {

    const role = useSelector(state=> state.userData.userRole);
    console.log(role);
    if(role==='ADMIN'){
        return children
    }else{
        return <Navigate to="/"/> }
}

export default AdminRoutes
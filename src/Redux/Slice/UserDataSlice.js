import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null,
    userName : null,
    userRole : null
}
if(localStorage.getItem("role")){
    initialState.userRole=localStorage.getItem("role");
}

const userDateSlice = createSlice({
    name : "userData",
    initialState,
    reducers:{
        setUserData : (state , action)=>{
            state.userData = action.payload
            localStorage.setItem("role",action.payload.role)
            state.userRole=action.payload.role
        },
        clearUserData: (state)=>{
            state.userData=null
        },
        setUserName: (state , action)=>{
            state.userName = action.payload
        },
        clearUserData: (state)=>{
            state.userName= null
        },
        setUserRole: (state , action)=>{
            state.userRole= action.payload
        },clearUserRole : (state )=>{
            state.userRole = null
        }

    }
})


export const {setUserData,clearUserData,setUserRole} = userDateSlice.actions
export default userDateSlice.reducer
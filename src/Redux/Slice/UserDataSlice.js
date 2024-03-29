import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : null,
    userName : null,
    userRole : null
}


const userDateSlice = createSlice({
    name : "userData",
    initialState,
    reducers:{
        setUserData : (state , action)=>{
            state.userData = action.payload
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


export const {setUserData,clearUserData,} = userDateSlice.actions
export default userDateSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AuthSlice";
import UserDataSlice from "./Slice/UserDataSlice";


const appStore = configureStore({
    reducer:{
        auth :authReducer,
        userData: UserDataSlice
    }
})

export default appStore;
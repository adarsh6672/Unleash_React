import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/AuthSlice"
;


const appStore = configureStore({
    reducer:{
        auth :authReducer,
    }
})

export default appStore;
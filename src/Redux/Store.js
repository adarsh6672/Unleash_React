import { configureStore } from "@reduxjs/toolkit";
import { createStore } from 'redux';
import authReducer from "./Slice/AuthSlice";
import UserDataSlice from "./Slice/UserDataSlice";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    
  }

  const rootReducer = combineReducers({
    auth :authReducer,
    userData: UserDataSlice
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  export const store = createStore(persistedReducer);
  export const persistor = persistStore(store);



const appStore = configureStore({
    reducer:{
        auth :authReducer,
        userData: UserDataSlice
    }
})

export default appStore;
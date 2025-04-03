import {combineReducers} from "@reduxjs/toolkit";
import {authApi} from "@/features/api/authApi.js";
import authSlice from "@/features/authSlice.js";


const rootReducer=  combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    auth:authSlice,
})


export default rootReducer
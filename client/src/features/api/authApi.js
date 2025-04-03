import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userLoggedIn} from "@/features/authSlice.js";


// const USER_API = process.env.BASE_URL || "http://localhost:8080/api/v3"
const USER_API ="http://localhost:5050/api/v3/user/"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:"include"
    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"register",
                method:"POST",
                body:inputData,
            })
        }),
        logInUser:builder.mutation({
            query:(inputData)=>({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_,{queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                }catch (e) {
                    console.log("error from authApi---->>>", e)

                }
            }
        })

    })

})


export const {useRegisterUserMutation, useLogInUserMutation} = authApi
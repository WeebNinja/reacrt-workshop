import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import {useDispatch} from 'react-redux'
import productSlice from "./slices/productSlice";
import customer from "./slices/customerSlice";
import customerSlice from "./slices/customerSlice";

export const store = configureStore({
    reducer:{
        user:authSlice,
        products:productSlice,
        customers:customerSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
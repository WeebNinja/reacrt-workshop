
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CustomerData } from "@/models/customer.modal";


type Customer = {
    customers : CustomerData[]
}

const initialState: Customer ={
    customers:[]
}

const customerSlice = createSlice({
    name:'fetchCustomer',
    initialState,
    reducers:{
        setCustomers:(state,action: PayloadAction<CustomerData[]>)=>{
            state.customers= action.payload
        }
    }
})

export const {setCustomers}=customerSlice.actions

export const productSelector = (state:RootState)=>state.customers.customers
export default customerSlice.reducer
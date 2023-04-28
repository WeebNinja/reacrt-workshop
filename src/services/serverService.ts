import { Customer } from "@/models/customer.modal";
import { Product } from "@/models/product.modal";
import { SignIn } from "@/models/signin.model";
import httpClient from "@/utils/httpClient";


type SignInProps={
    username : string
    password : string
}
// AUTHENTICATION
export const signIn = async(Credentials:SignInProps):Promise<SignIn>=>{
    const {data:response} = await httpClient.post<SignIn>('/auth',Credentials)
    return response
}

export const signOut = async(): Promise<void> =>{
    await httpClient.post('auth/logout',null)
}

// PRODUCT
export const fecthPordutcs = async (): Promise<Product> =>{
    const {data: response} = await httpClient.get<Product>('/products')
    return response
}

export const fetchCustomer = async (): Promise<Customer> =>{
    const {data: response} = await httpClient.get<Customer>('/customers')
    return response
}
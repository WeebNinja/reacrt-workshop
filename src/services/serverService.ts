import { SignIn } from "@/models/signin.model";
import httpClient from "@/utils/httpClient";
import { type } from "os";


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
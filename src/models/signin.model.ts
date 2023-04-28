import { UserData } from "./user.model";

export interface SignIn {
    success:    boolean;
    acessToken: string;
    user:       UserData;
}
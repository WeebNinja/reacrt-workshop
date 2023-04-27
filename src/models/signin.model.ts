import { User } from "./user.model";

export interface SignIn {
    success:    boolean;
    acessToken: string;
    user:       User;
}
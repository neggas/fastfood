import { IsNotEmpty } from "class-validator";

export class UserCredentialDto{
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string
}
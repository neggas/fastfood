import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.model';
import {Model,isValidObjectId} from "mongoose";
import {UserCredentialDto} from "./DTO/user-credential";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User") private readonly userModel : Model<User>
    ){}

    async login(userCredential:UserCredentialDto){
        const {email,password} = userCredential;
        const user = await this.userModel.findOne({email}).exec();
        if(!user) throw new NotFoundException("votre email n'existe pas");

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) throw new NotFoundException("password is incorrect");

        return user;
    }
}

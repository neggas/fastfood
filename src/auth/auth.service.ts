import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.model';
import {Model,isValidObjectId} from "mongoose";
import {UserCredentialDto} from "./DTO/user-credential";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel("User") private readonly userModel : Model<User>,
        private readonly jwtService:JwtService
    ){}

    async login(userCredential:UserCredentialDto){
        const {email,password} = userCredential;
        const user = await this.userModel.findOne({email}).exec();
        if(!user) throw new NotFoundException("votre email n'existe pas");

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) throw new NotFoundException("password is incorrect");

       const payload = {name:user.name,email:user.email};
        const jwt = await this.jwtService.sign(payload);
        return {
            "access_token":jwt
        };
    }
}

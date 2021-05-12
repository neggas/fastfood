import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import {Model,isValidObjectId} from "mongoose";

import * as bcrypt from "bcrypt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
            @InjectModel("User") private readonly UserModel : Model<User>,
            private readonly configService:ConfigService
        ){}

    async create(userDoc){
        const {password,email} = userDoc;
       
        const user = await this.UserModel.findOne({email}).exec();
        if(user) throw new ConflictException("Cet email est liée dejà liée à un compte");
        
        const salt = this.configService.get("SALT");
        const hassedPassword = await bcrypt.hash(password,10);
        userDoc.password = hassedPassword;

        const newUserModel = new this.UserModel({...userDoc});
        const newUser = await newUserModel.save();

        if(!newUser) throw new BadRequestException("Veuiller verifier vos champ de saisie svp ");

        return newUser;

    }

    private async  SingleUser(userId) : Promise<User>{

        if(!isValidObjectId(userId)){
            throw new BadRequestException(`${userId} is not a valid userId`);
        }
        const findUser = await this.UserModel.findById(userId);

        if(!findUser) throw new NotFoundException("Not Found");
        return findUser;
    }

    async AllUsers(user:User):Promise<User[]>{

        if(!user.isAdmin) throw new UnauthorizedException();
        const users = await this.UserModel.find().exec();
        return users;
    }

    async userById(userId,user:User):Promise<User>{

        if(!(user.isAdmin || user.id == userId)) throw new UnauthorizedException();
        const  findUser = await this.SingleUser(userId);
        return findUser;
    }

    async deleteOne(userId){
        const  findUser = await this.SingleUser(userId);
        if(findUser){
            const deletedUser = this.UserModel.findByIdAndDelete(userId);
            return deletedUser;
        }
    }

    async updateUser(userId,userDoc){
        const {password} = userDoc;
        const  findUser = await this.SingleUser(userId);
        let hashedPassword : string;

        if(findUser){

           if(password){
                hashedPassword = await bcrypt.hash(password,10);
                userDoc.password = hashedPassword; 
           }

           const updatedUser = await this.UserModel.findByIdAndUpdate(userId,{...userDoc},{new:true});

           if(!updatedUser) throw new BadRequestException("Vérifier les informations")
           return updatedUser;
        }
    }


}

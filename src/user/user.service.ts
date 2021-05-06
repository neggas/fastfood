import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import {Model} from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel("User") private readonly UserModel : Model<User>){}
}

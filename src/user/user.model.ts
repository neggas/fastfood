
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    passwordHash:{
        type:String,
        default:''
    },
    street:{
        type:String,
        default:''
    },
    apartment:{
        type:String,
        default:''
    },
    city:{
        type:String,
        default:''
    },
    zip:{
        type:String,
        default:''
    },
    country:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

UserSchema.set('toJSON',{
    virtuals:true
})


export interface User extends mongoose.Document{
    id:string;
    name?:string;
    email?:string;
    passwordHash?:string;
    street?:string;
    apartment?:string;
    city?:string;
    zip?:string;
    country?:string;
    phone?:number;
    isAdmin?:boolean;
}
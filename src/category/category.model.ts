
import * as mongoose from "mongoose";


export const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        default:''
    },
    color:{
        type:String,
        default:''
    },
    icon:{
        type:String,
        default:''
    },
    image:{
        type:String,
        default:''
    }
}) 


export interface Category extends mongoose.Document{
    id:string;
    name:string;
    color?:string;
    icon?:string;
    image?:string;
} 
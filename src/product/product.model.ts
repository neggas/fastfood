import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        required:false,
        default:''
    },
    image:{
        type:String,
        required:false
    },
    images:[{
        type:String,
    }],
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    countInStock:{
        type:Number,
        min:0,
        max:255,
        required:true
    },
    rating:{
        type:Number,
        required:false,
        default:0
    },
    isFeatured:{
        type:Boolean,
        required:false
    },
    dateCreated:{
        type:Date,
        default:Date.now

    }

});


export interface Product extends mongoose.Document {
    name:string,
    description:string,
    richDescription:string,
    image:string,
    images?:string[],
    brand?:string,
    price:number,
    category:Object,
    countInStock:number,
    rating:number,
    isFeatured:number,
    dateCreated:Date
}
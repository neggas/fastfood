
import * as mongoose from "mongoose";
import { User } from "src/user/user.model";
import {OrderItem} from "src/order/models/orderItems.model";

export const OrdersSchema = new mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem"
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    shippingAddress1:{
        type:String,
        default:''
    },
    shippingAddress2:{
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
    status:{
        type:String,
        default:'pending'
    },
    totalPrice:{
        type:Number,
        default:0
    },
    dateOrdered:{
        type:Date,
        default:Date.now
    }
})


OrdersSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

OrdersSchema.set('toJSON',{
    virtuals:true
})

export interface Orders extends mongoose.Document{
    id:string;
    orderItems:OrderItem[];
    user:User;
    shippingAddress1:string;
    shippingAddress2?:string;
    city:string;
    zip:string;
    country:string;
    phone:string;
    status:string;
    totalPrice:number;
    dateOrdered:Date;
}



/*
{
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "5fcfc406ae79b0a6a90d2585"
        },
        {
            "quantity": 2,
            "product" : "5fd293c7d3abe7295b1403c4"
        }
    ],
    "shippingAddress1" : "Flowers Street , 45",
    "shippingAddress2" : "1-B",
    "city": "Prague",
    "zip": "00000",
    "country": "Czech Republic",
    "phone": "+420702241333",
    "user": "609b2288a222953c78e8f2ec"
}

 */
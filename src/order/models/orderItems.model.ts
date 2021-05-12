
import * as mongoose from "mongoose";
import { Product } from "src/product/product.model";

export const OrderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity: {
        type:Number,
        default:0
    }
})


OrderItemSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

OrderItemSchema.set('toJSON',{
    virtuals:true
})

export interface OrderItem extends mongoose.Document{
    id:string;
    product:Product;
    quantity:number;
}
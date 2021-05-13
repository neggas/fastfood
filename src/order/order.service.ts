import { Orders, OrdersSchema } from './models/orders.model';
import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from './models/orderItems.model';
import {isValidObjectId} from "mongoose";
import { User } from 'src/user/user.model';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel("Orders") private readonly order: Model<Orders>,
        @InjectModel("OrderItem") private readonly ordertem : Model<OrderItem>
    ){}

    async All(user:User){

        if(!user.isAdmin) throw new UnauthorizedException();
        const orders = await this.order.find().exec();
        if(!orders) throw new NotFoundException();

        return orders;
    }


    async Create(orderDoc: Orders){
        let {orderItems} = orderDoc;

        const orderItemsId = Promise.all(orderItems.map(async(ord) =>{
            let newOrderItem = new this.ordertem({...ord});
            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        }))

        orderItems = await orderItemsId;

        const totalPrices = await Promise.all(orderItems.map(async(ord)=>{
          const orderItem = await this.ordertem.findById({_id:ord}).populate("product","price").exec();
          const totalprice = orderItem.product.price*orderItem.quantity;
          return totalprice;
        }))

        const totalPrice = totalPrices.reduce((a,b)=>a+b,0);
        orderDoc.orderItems = orderItems;
        orderDoc.totalPrice = totalPrice;

        let newOrder = new this.order({...orderDoc});
        newOrder = await newOrder.save();

        if(!newOrder) throw new NotFoundException("the order cannot be created");

        return newOrder;

    }

    async Detail(orderId){

        if(!isValidObjectId(orderId)) 
            throw new NotAcceptableException(`${orderId} is not match with order id`);
        
        const order = await this.order.findById(orderId)
        .populate("user","name")
        .populate({path:"orderItems",populate:{path:"product",populate:"category"}})
        .exec();
        if(!order) throw new NotFoundException();

        return order;
    }

    async UpdateStatus(orderId,status,user:User){

        if(!user.isAdmin) throw new UnauthorizedException();
        if(!isValidObjectId(orderId)) 
            throw new NotAcceptableException(`${orderId} is not match with order id`);
        const order = await this.order.findByIdAndUpdate({_id:orderId},{status},{new:true}).exec();

        if(!order) throw new NotFoundException();

        return order;
    }

    async Delete(orderId,user:User){
       
        if(!user.isAdmin) throw new UnauthorizedException();
        if(!isValidObjectId(orderId)) 
            throw new NotAcceptableException(`${orderId} is not match with order id`);
        const deletedOrder = await this.order.findByIdAndRemove({_id:orderId}).exec();

        if(!deletedOrder) throw new NotFoundException();

        const {orderItems} = deletedOrder;

        Promise.all(orderItems.map(async(ord)=>{
            await this.ordertem.findByIdAndRemove({_id:ord}).exec();
        }))

        return deletedOrder;
    }
    
}   

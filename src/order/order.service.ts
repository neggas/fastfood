import { Orders, OrdersSchema } from './models/orders.model';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from './models/orderItems.model';
import {isValidObjectId} from "mongoose";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel("Orders") private readonly order: Model<Orders>,
        @InjectModel("OrderItem") private readonly ordertem : Model<OrderItem>
    ){}

    async All(){
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
        orderDoc.orderItems = orderItems;
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
    
}   

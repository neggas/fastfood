import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}

    @Get()
    async allOrders(){
        const response = await this.orderService.All();
        return response;
    }

    @Post()
    async createOrder(@Body() orderDoc){
        const response = this.orderService.Create(orderDoc);
        return response;
    }

    @Get(":id")
    async orderDetail(@Param('id') orderId:string){
        const response = await this.orderService.Detail(orderId);
        return response;
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/user/decorators/user.decorator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService:OrderService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async allOrders(@User() User){
        const response = await this.orderService.All(User);
        return response;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Body() orderDoc){
        const response = this.orderService.Create(orderDoc);
        return response;
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async orderDetail(@Param('id') orderId:string){
        const response = await this.orderService.Detail(orderId);
        return response;
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard)
    async updateOrder(
            @Param('id') orderId:string, 
            @Body('status') status:string,
            @User() User
            ){
        const response =  await this.orderService.UpdateStatus(orderId,status,User);
        return response;
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async deleteOrder(@Param('id') categoryId:string,  @User() User){
        const response = await this.orderService.Delete(categoryId,User);
        return response;
    }

}

import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema } from './models/orders.model';
import { OrderItemSchema } from './models/orderItems.model';

@Module({
  imports:[MongooseModule.forFeature([
    {name:"Orders",schema:OrdersSchema},
    {name:"OrderItem",schema:OrderItemSchema}
  ])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}

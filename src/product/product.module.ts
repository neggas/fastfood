import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import  {ProductSchema} from "./product.model";
import {MongooseModule} from '@nestjs/mongoose'
import { CategorySchema } from 'src/category/category.model';

@Module({
  imports:[MongooseModule.forFeature([
    {name:"Product",schema:ProductSchema},
    {name:"Category",schema:CategorySchema}
  ])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

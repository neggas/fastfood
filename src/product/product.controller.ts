import { Body, Controller, Get, Param, Patch, Post,Delete,Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService:ProductService){}


    @Post()
    async create(@Body() product : Product){
        const response = await this.productService.create(product);
        return response;
    }

   


    @Get()
    async allProduct(@Req() req : Request){
        const {categories} = req.query

        const response = await this.productService.allProduct(categories);
        return response;
    }



    @Get(":id")
    async singleProduct(@Param("id") productId : string ){

    
        const response = await this.productService.singleProduct(productId);
        return response;
    }

    @Patch(":id")
    async updateProduct(@Param("id") productId:string, @Body() updateProduct:Product){
        
        const response = await this.productService.updateProduct(productId,updateProduct);
        return response;
    }

    @Delete(":id")
    async deleteCategory(@Param('id') categoryId:string){
        const response = await this.productService.deleteOne(categoryId);
        return response;
    }

    @Get("get/count")
    async getCountProduct(){
        const countedProduct = await this.productService.countProduct();
        return countedProduct;
    }

    @Get("featured/:count")
    async getFeaturedProduct(@Param("count") count){
        const response = await this.productService.getFeaturedPoducts(+count);
        return response;
    }
}

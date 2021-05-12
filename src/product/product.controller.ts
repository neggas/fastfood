import { Body, Controller, Get, Param, Patch, Post,Delete,Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Product } from './product.model';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/user/decorators/user.decorator';

@Controller('products')
export class ProductController {
    constructor(private readonly productService:ProductService){}


    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() product : Product,@User() User){
        const response = await this.productService.create(product,User);
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
    @UseGuards(JwtAuthGuard)
    async updateProduct(@Param("id") productId:string, @Body() updateProduct:Product,@User() User){
        
        const response = await this.productService.updateProduct(productId,updateProduct,User);
        return response;
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async deleteCategory(@Param('id') categoryId:string,@User() User){
        const response = await this.productService.deleteOne(categoryId,User);
        return response;
    }

    @Get("get/count")
    @UseGuards(JwtAuthGuard)
    async getCountProduct(@User() User){
        const countedProduct = await this.productService.countProduct(User);
        return countedProduct;
    }

    @Get("featured/:count")
    @UseGuards(JwtAuthGuard)
    async getFeaturedProduct(@Param("count") count,@User() User){
        const response = await this.productService.getFeaturedPoducts(+count,User);
        return response;
    }
}

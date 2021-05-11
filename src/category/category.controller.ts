import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() category){
       const newCategory = await this.categoryService.create(category);
       return newCategory
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async deleteCategory(@Param('id') categoryId:string){
        const response = await this.categoryService.deleteOne(categoryId);
        return response;
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    async AllCategory(){
       const response = await this.categoryService.allCategories();
       return response;
    }

    @Get(":id")
    @UseGuards(JwtAuthGuard)
    async SingleCategorie(@Param('id') categoryId:string){
        const response = await this.categoryService.singleCategory(categoryId);
        return response;
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard)
    async UpdateCategory(
        @Param("id") categoryId : string,
        @Body() category : Category
    ){
        const response = await this.categoryService.updateCategory(categoryId,category);
        return response;
    }

}

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Post()
    async create(@Body() category){
       const newCategory = await this.categoryService.create(category);
       return newCategory
    }

    @Delete(":id")
    async deleteCategory(@Param('id') categoryId:string){
        const response = await this.categoryService.deleteOne(categoryId);
        return response;
    }


    @Get()
    async AllCategory(){
       const response = await this.categoryService.allCategories();
       return response;
    }

    @Get(":id")
    async SingleCategorie(@Param('id') categoryId:string){
        const response = await this.categoryService.singleCategory(categoryId);
        return response;
    }

    @Patch(":id")
    async UpdateCategory(
        @Param("id") categoryId : string,
        @Body() category : Category
    ){
        const response = await this.categoryService.updateCategory(categoryId,category);
        return response;
    }

}

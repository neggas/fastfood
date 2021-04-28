import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ){}

    @Post()
    create(@Body() category){
       this.categoryService.create(category);
    }


    @Get()
    findAll():string{
        return "je suis dans la routes category"
    }
}

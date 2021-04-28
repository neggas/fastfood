import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Category} from "./category.model";
import {Model} from "mongoose";


@Injectable()
export class CategoryService {
    constructor(
        @InjectModel("Category") categoryModel : Model<Category>
    ){}

    async create(category){
        console.log(category);
    }
}

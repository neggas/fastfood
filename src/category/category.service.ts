import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Category} from "./category.model";
import {Model, Mongoose,isValidObjectId} from "mongoose";


@Injectable()
export class CategoryService {
    constructor(
        @InjectModel("Category")  private readonly categoryModel : Model<Category>
    ){}
    

    //create category service methode
    async create(category) : Promise<Category>{
        const  newCategoryModel = new this.categoryModel(category);
        const newCategory = await newCategoryModel.save();

        if(! newCategory){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'You have made bad request',
            }, HttpStatus.BAD_REQUEST);
        }

        return newCategory
            
    }


    //delete Category service methode
    async deleteOne(categoryId):Promise<{status:boolean,message:string}>{

        if(!isValidObjectId(categoryId)) {
            return {
                status:false,
                message:"Invalid Id"
            }
        }

        try {
            const removedCategory =  await this.categoryModel.findByIdAndRemove(categoryId);
            if(removedCategory){
                return {
                    status:true,
                    message:"The category is deleted"
                }
            }else{
                return {
                    status:false,
                    message:"Category not found"
                }
            }
        } catch (error) {
            return {
                status:false,
                message:error
            }
        } 
    }

    async allCategories() : Promise<Category[] | {status:boolean}>{
        const categorys = await this.categoryModel.find().exec();

        if(!categorys)
            return {status:false}

        return categorys;
    }

    async singleCategory(categoryId): Promise<Category | {status:boolean,message:string}>{
        const category = await this.categoryModel.findById(categoryId).exec();

        if(!category){
            return{
                status:false,
                message:"The category with given Id was not found."
            }
        }

        return category;
            
    }


    async updateCategory(categoryId,updateInfo):Promise<Category | {status:boolean,message:string}>{
        const updatedProduct = await this.categoryModel.findByIdAndUpdate(
            {_id:categoryId},
            {...updateInfo},
            {new:true}
        );
        
        if(!updatedProduct){
            return {
                status:false,
                message:"The category cannot be created"
            }
        }

        return updatedProduct;
    }
}

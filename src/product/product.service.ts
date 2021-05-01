import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose";
import { Category } from 'src/category/category.model';
import {Product} from "./product.model";
import {isValidObjectId} from "mongoose";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel("Product") private readonly ProductModel : Model<Product>,
        @InjectModel("Category")  private readonly categoryModel : Model<Category>
    ){}

    async create(product):Promise<Product>{
        const category = await this.categoryModel.findById(product.category).exec();
        
        if(!category){
            throw new NotFoundException(`the product with id : ${product.category} is invalid`);
        }

        const createdPrduct = new this.ProductModel({...product});
        const newProduct = await createdPrduct.save();

        if(!newProduct)  throw new BadRequestException("You have made bad request");
        return newProduct;
   }

    async allProduct(categories):Promise<Product[] | {status:boolean,message:string}>{

        let products : Product[]

        if(categories){

            const allPassed = categories.split(",").every((cat)=> isValidObjectId(cat) );

            if(!allPassed){
                return{
                    status:false,
                    message:"Contain invalid category id"
                }
            }
            
            const filtered = {category:categories.split(",")}
            products = await this.ProductModel.find(filtered).populate("category").exec();

        }else
            products = await this.ProductModel.find().populate("category").exec();
  
        

        if(!products) throw new NotFoundException("Not found any product");
        
        return products;
   }


    async singleProduct(productId):Promise<Product>{
        const product = await this.ProductModel.findById(productId).populate("category").exec();

        if(!product){
            throw new NotFoundException(`Not found product with id :${productId}`);
        } 
        return product;
   }

   async updateProduct(productId,updateProduct):Promise<Product | {status:boolean,message:string}>{
       const product = await this.ProductModel.findById(productId).exec();

       if(!product){
           throw new NotFoundException(`Not found product with id : ${productId}`);
       }

       const updatedProduct  = await this.ProductModel
       .findByIdAndUpdate({_id:productId},{...updateProduct},{new:true}).exec();

       if(! updatedProduct){
            return {
                status:false,
                message:"The category cannot be created"
            }
       }

       return updatedProduct;
   }

    async deleteOne(productId):Promise<{status:boolean,message:string}>{

        if(!isValidObjectId(productId)){
            return{
                status:false,
                message:"The Product id is invalid"
            }
        }

        try {
            const removedProduct =  await this.ProductModel.findByIdAndRemove(productId);
            if(removedProduct){
                return {
                    status:true,
                    message:"The Product is deleted"
                }
            }else{
                return {
                    status:false,
                    message:"Product not found"
                }
            }
        } catch (error) {
            return {
                status:false,
                message:error
            }
        } 
    }


    async countProduct():Promise<{status:boolean,message:string} |{productCount:number} >{
        const countedProducts = await this.ProductModel.countDocuments((count) => count).exec();

        if(!countedProducts){
            return{
                status:false,
                message:"cannont count products"
            }
        }

        return {
            productCount:countedProducts
        };
    }

    async getFeaturedPoducts(count):Promise<{status:boolean} | Product[]>{

        let counted = count ? count : 0;
        const products = await this.ProductModel.find({isFeatured:true}).limit(+counted);

        if(!products){
            return {
                status:false
            }
        }

        return products;
    }



}

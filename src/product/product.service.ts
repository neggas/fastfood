import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose";
import {Product} from "./product.model";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel("Product") private readonly ProductModel : Model<Product>
    ){}

   
}

import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./entities/product.entity";
import { CreateProductDTO } from "./dto/create-product.dto";

@Injectable()
export class ProductService {
	constructor(@InjectModel("Product") private readonly productModel: Model<ProductDocument>) {}

	public async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
		const newProduct = await this.productModel.create(createProductDTO);
		return newProduct.save();
	}
}

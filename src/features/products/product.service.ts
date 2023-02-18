import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductsException } from './exceptions/products.exception';

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {}

	public async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
		try {
			const newProduct = await this.productModel.create(createProductDTO);
			return newProduct.save();
		} catch (error) {
			if (error?.name === 'MongoServerError') {
				throw new ProductsException('This slug already exists', HttpStatus.BAD_REQUEST);
			}

			throw new ProductsException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

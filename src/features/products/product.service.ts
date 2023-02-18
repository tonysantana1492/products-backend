import { Injectable, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductsException } from './exceptions/products.exception';

@Injectable()
export class ProductService {
	constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

	public async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
		try {
			return this.productModel.create(createProductDTO);
		} catch (error) {
			if (error?.name === 'MongoServerError') {
				throw new ProductsException('This slug already exists', HttpStatus.BAD_REQUEST);
			}

			throw new ProductsException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

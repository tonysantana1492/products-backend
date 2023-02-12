import { Injectable, HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Inventory, InventoryDocument } from "./entities/inventory.entity";
import { CreateInventoryDTO } from "./dto/create-inventory.dto";
import { ProductService } from "../products/product.service";
import { InventoryException } from "./exceptions/inventory.exception";
// import { INITIAL_DATA } from "src/utils/seed-data";

@Injectable()
export class InventoryService {
	constructor(
		@InjectModel("Inventory") private readonly inventoryModel: Model<InventoryDocument>,
		private readonly productService: ProductService
	) {}

	// public async createDataTest(): Promise<void> {
	// 	const inventoryInitial = INITIAL_DATA.inventory;

	// 	for (const data of inventoryInitial) {
	// 		await this.addProductToInventory(data);
	// 	}

	// 	return;
	// }

	public async addProductToInventory(createInventoryDTO: CreateInventoryDTO): Promise<Inventory> {
		const { product, amount } = createInventoryDTO;

		try {
			const { _id } = await this.productService.addProduct(product);

			return await this.inventoryModel.create({ product: _id, amount });
		} catch (error) {
			if (error?.name === "MongoServerError") {
				throw new InventoryException("This product already exists in the inventary", HttpStatus.BAD_REQUEST);
			}

			throw new InventoryException(error.message, HttpStatus.BAD_REQUEST);
		}
	}

	public async getInventaryProducts(): Promise<Inventory[]> {
		return await this.inventoryModel.find().populate("product").exec();
	}

	public async getinventaryByProductId(productId: string): Promise<Inventory> {
		return await this.inventoryModel.findOne({ product: productId }).populate("product").exec();
	}

	public async reduceInventaryByProductId(productId: string, reduceAmount: number): Promise<Inventory> {
		const inventory = await this.inventoryModel.findOne({ product: productId });

		const { amount: actualAmount } = inventory;

		const newAmount = actualAmount - reduceAmount;

		if (newAmount < 0) throw new InventoryException("We have not this amount available", HttpStatus.BAD_REQUEST);

		inventory.amount = newAmount;

		return inventory.save();
	}

	public async incrementInventaryByProductId(productId: string, reduceAmount: number): Promise<Inventory> {
		const inventory = await this.inventoryModel.findOne({ product: productId });

		const { amount: actualAmount } = inventory;

		const newAmount = actualAmount + reduceAmount;
		inventory.amount = newAmount;

		return inventory.save();
	}
}

import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Inventory, InventoryDocument } from "./entities/inventory.entity";
import { CreateInventoryDTO } from "./dto/create-inventory.dto";
import { ProductService } from "../products/product.service";

@Injectable()
export class InventoryService {
	constructor(
		@InjectModel("Inventory") private readonly inventoryModel: Model<InventoryDocument>,
		private readonly productService: ProductService
	) {}

	public async addProductToInventory(createInventoryDTO: CreateInventoryDTO): Promise<Inventory> {
		const { product, amount } = createInventoryDTO;

		const { _id } = await this.productService.addProduct(product);

		const newInventory = await this.inventoryModel.create({ product: _id, amount });
		return newInventory.save();
	}

	public async getInventaryProducts(): Promise<Inventory[]> {
		const inventory = await this.inventoryModel.find().populate("product").lean();
		return inventory;
	}

	public async getinventaryByProductId(productId: string): Promise<Inventory> {
		const inventory = await this.inventoryModel.findOne({ product: productId }).populate("product").lean();
		return inventory;
	}

	public async reduceInventaryByProductId(productId: string, reduceAmount: number): Promise<Inventory> {
		const inventory = await this.inventoryModel.findOne({ product: productId });

		const { amount: actualAmount } = inventory;

		const newAmount = actualAmount - reduceAmount;

		if (newAmount < 0) throw new HttpException("We have not this amount available", HttpStatus.BAD_REQUEST);

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

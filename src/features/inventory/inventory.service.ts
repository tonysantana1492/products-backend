import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Inventory, InventoryDocument } from "./entities/inventory.entity";

@Injectable()
export class InventoryService {
	constructor(@InjectModel("Inventory") private readonly inventoryModel: Model<InventoryDocument>) {}
}

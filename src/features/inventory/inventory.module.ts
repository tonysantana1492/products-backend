import { Module } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { MongooseModule } from "@nestjs/mongoose";
import { InventorySchema } from "./entities/inventory.entity";
import { InventoryController } from "./inventory.controller";
import { ProductModule } from "../products/products.module";

@Module({
	imports: [ProductModule, MongooseModule.forFeature([{ name: "Inventory", schema: InventorySchema }])],
	controllers: [InventoryController],
	providers: [InventoryService]
})
export class InventoryModule {}

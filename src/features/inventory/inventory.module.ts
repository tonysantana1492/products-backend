import { Module } from "@nestjs/common";
import { ProductController } from "./inventory.controller";
import { InventoryService } from "./inventory.service";
import { MongooseModule } from "@nestjs/mongoose";
import { InventorySchema } from "./entities/inventory.entity";

@Module({
	imports: [MongooseModule.forFeature([{ name: "Inventory", schema: InventorySchema }])],
	controllers: [ProductController],
	providers: [InventoryService]
})
export class InventoryModule {}

import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./entities/product.entity";

@Module({
	imports: [MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }])],
	controllers: [],
	providers: [ProductService],
	exports: [ProductService]
})
export class ProductModule {}

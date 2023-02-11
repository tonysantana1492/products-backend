import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Product } from "src/features/products/entities/product.entity";

const options = {
	timestamps: true
};

export type InventoryDocument = Inventory & Document;

@Schema(options)
export class Inventory {
	_id: string;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name, required: true, unique: true })
	product: Product;

	@Prop({ required: true })
	amount: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

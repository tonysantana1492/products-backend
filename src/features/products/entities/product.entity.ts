import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

const options = {
	timestamps: true
};

export type ProductDocument = Product & Document;

@Schema(options)
export class Product {
	_id: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true, trim: true, lowercase: true })
	slug: string;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true })
	price: number;

	@Prop({ required: true })
	category: string;

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

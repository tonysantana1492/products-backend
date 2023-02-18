import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

const options = {
	timestamps: true,
};

export type ProductDocument = HydratedDocument<Product>;

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);

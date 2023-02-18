import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument, ObjectId } from 'mongoose';

const options = {
	timestamps: true,
	toJSON: {
		getters: true,
		virtuals: true,
		transform: (document: any, returnedObject: any) => {
			delete returnedObject._id;
			delete returnedObject.__v;

			return returnedObject;
		},
	},
};

export type ProductDocument = HydratedDocument<Product>;

@Schema(options)
export class Product {
	@Transform(({ value }) => value.toString())
	_id: ObjectId;

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

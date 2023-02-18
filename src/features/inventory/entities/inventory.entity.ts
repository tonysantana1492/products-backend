import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';
import { HydratedDocument, ObjectId, Schema as MongooseSchema } from 'mongoose';
import { Product } from 'src/features/products/entities/product.entity';

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

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema(options)
export class Inventory {
	@Transform(({ value }) => value.toString())
	_id: ObjectId;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name, required: true, unique: true })
	@Type(() => Product)
	product: Product;

	@Prop({ required: true })
	amount: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/authorization/enums/role.enum';

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

export type UserDocument = HydratedDocument<User>;

@Schema(options)
export class User {
	@Transform(({ value }) => value.toString())
	_id: string;

	@Prop({ required: true })
	name: string;

	@Prop({ required: true, unique: true, trim: true, lowercase: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ enum: Role, required: true })
	role: string;
}

const UserSchema = SchemaFactory.createForClass(User);
// UserSchema.virtual('id').get(function (this: UserDocument) {
// 	return this._id;
// });
export { UserSchema };

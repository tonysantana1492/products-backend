import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "src/authorization/enums/role.enum";

const options = {
	timestamps: true
};

export type UserDocument = HydratedDocument<User>;

@Schema(options)
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);

import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/authorization/enums/role.enum";

const options = {
	timestamps: true
};

export type UserDocument = User & Document;

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

	@Prop()
	createdAt: Date;

	@Prop()
	updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

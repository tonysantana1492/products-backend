import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LogDocument = HydratedDocument<Log>;

const options = {
	timestamps: true
};

@Schema(options)
export class Log {
	@Prop()
	id: number;

	@Prop()
	context: string;

	@Prop()
	message: string;

	@Prop()
	level: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);

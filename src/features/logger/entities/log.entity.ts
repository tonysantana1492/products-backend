import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
	@Prop()
	id: number;

	@Prop()
	context: string;

	@Prop()
	message: string;

	@Prop()
	level: string;

	@Prop()
	creationDate: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);

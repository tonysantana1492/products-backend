import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type LogDocument = Log & Document;

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

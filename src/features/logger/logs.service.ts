import { Injectable } from "@nestjs/common";
import { CreateLogDto } from "./dto/create-log.dto";
import { Log, LogDocument } from "./entities/log.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class LogsService {
	constructor(@InjectModel(Log.name) private readonly logModel: Model<LogDocument>) {}

	async createLog(logDto: CreateLogDto) {
		const newLog = await this.logModel.create(logDto);
		return newLog;
	}
}

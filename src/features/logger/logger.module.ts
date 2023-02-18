import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './custom-logger';
import { LogsService } from './logs.service';
import { Log, LogSchema } from './entities/log.entity';

@Module({
	imports: [ConfigModule, MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
	providers: [CustomLogger, LogsService],
	exports: [CustomLogger],
})
export class LoggerModule {}

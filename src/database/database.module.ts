import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get("database.mongoUrl"),
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
		})
	]
})
export class DatabaseModule {}

import { Module } from "@nestjs/common";
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import { validate } from "./env.validation";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			validate,
			load: [appConfig, databaseConfig, jwtConfig]
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			connectionName: "products",
			useFactory: async (config: ConfigService) => ({
				uri: config.get("database.mongoUrl"),
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
		})
	],
	controllers: [],
	providers: []
})
export class AppModule {}

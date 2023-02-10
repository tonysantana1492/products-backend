import { Module } from "@nestjs/common";
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import { validate } from "./env.validation";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "./features/users/users.module";
import { LoggerModule } from "./features/logger/logger.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ProductModule } from "./features/products/products.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			validate,
			load: [appConfig, databaseConfig, jwtConfig]
		}),
		// MongooseModule.forRoot("mongodb://localhost:27017/productsdb")
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get("database.mongoUrl"),
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
		}),
		AuthenticationModule,
		ProductModule,
		UsersModule,
		LoggerModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}

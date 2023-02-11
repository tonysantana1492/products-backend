import { Module, MiddlewareConsumer } from "@nestjs/common";
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
import { InventoryModule } from "./features/inventory/inventory.module";
import { LogsMiddleware } from "./utils/logs.middleware";

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
			useFactory: async (config: ConfigService) => ({
				uri: config.get("database.mongoUrl"),
				useNewUrlParser: true,
				useUnifiedTopology: true
			})
		}),
		AuthenticationModule,
		ProductModule,
		UsersModule,
		InventoryModule,
		LoggerModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LogsMiddleware).forRoutes("*");
	}
}

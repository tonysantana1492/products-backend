import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./config/app.config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import { validate } from "./env.validation";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
			validate,
			load: [appConfig, databaseConfig, jwtConfig]
		})
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}

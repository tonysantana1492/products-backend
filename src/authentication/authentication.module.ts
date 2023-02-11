import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/features/users/users.module";
import { JwtStrategy } from "../authorization/jwt.strategy";
import { AuthenticationService } from "./authentication.service";
import { AuthenticationController } from "./authentication.controller";
@Module({
	imports: [
		UsersModule,
		ConfigModule,
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (ConfigService: ConfigService) => ({
				secret: ConfigService.get("jwt.accessTokenSecret"),
				signOptions: {
					expiresIn: `${ConfigService.get("jwt.accessTokenExpirationTime")}s`
				}
			})
		})
	],
	providers: [AuthenticationService, JwtStrategy],
	controllers: [AuthenticationController],
	exports: [AuthenticationService, JwtStrategy, PassportModule]
})
export class AuthenticationModule {}

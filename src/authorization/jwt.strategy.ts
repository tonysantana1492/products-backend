import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../features/users/users.service";
import { TokenPayload } from "./interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService, private readonly userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get("jwt.accessTokenSecret")
		});
	}

	async validate(payload: TokenPayload) {
		const user = await this.userService.getById(payload.userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}

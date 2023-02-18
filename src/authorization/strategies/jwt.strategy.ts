import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../features/users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService, private readonly userService: UsersService) {
		super({
			/*jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
				  return request?.cookies?.Authentication;
				},
			  ]),*/
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get('jwt.accessTokenSecret'),
		});
	}

	async validate(payload: TokenPayload) {
		return await this.userService.getById(payload.userId);
	}
}

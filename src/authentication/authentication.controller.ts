import { Controller, Post, Body, UseGuards, HttpCode, Req, UseInterceptors } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from '../features/users/users.service';

import { RegisterDto } from './dto/register.dto';

import { Token } from 'src/authorization/interfaces/token.interface';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthenticationGuard } from '../authorization/guards/localAuthentication.guard';
import RequestWithUser from 'src/authorization/interfaces/requestWithUser.interface';
import { TokenPayload } from 'src/authorization/interfaces/token-payload.interface';
import MongooseClassSerializerInterceptor from 'src/database/mongooseClassSerializer.interceptor';
import { User } from 'src/features/users/entities/user.entity';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthenticationController {
	constructor(private authenticationService: AuthenticationService, private usersService: UsersService) {}

	@Post('register')
	async register(@Body() registrationData: RegisterDto): Promise<Token> {
		return this.authenticationService.register(registrationData);
	}

	@HttpCode(200)
	@UseGuards(LocalAuthenticationGuard)
	@Post('login')
	async login(@Req() request: RequestWithUser): Promise<Token> {
		const { user } = request;

		const payload: TokenPayload = { userId: user._id };
		const token = this.authenticationService.sigInToken(payload);

		return {
			access_token: token,
		};
	}
}

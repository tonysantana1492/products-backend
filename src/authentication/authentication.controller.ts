import { Controller, Post, Body, UseGuards, HttpCode, Req, UseInterceptors, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersService } from '../features/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { Token } from 'src/authorization/interfaces/token.interface';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LocalAuthenticationGuard } from '../authorization/guards/localAuthentication.guard';
import RequestWithUser from 'src/authorization/interfaces/requestWithUser.interface';
import { TokenPayload } from 'src/authorization/interfaces/token-payload.interface';
import MongooseClassSerializerInterceptor from 'src/database/mongooseClassSerializer.interceptor';
import { User } from 'src/features/users/entities/user.entity';
import { JwtAuthenticationGuard } from 'src/authorization/guards/jwt-authentication.guard';
import { LogInDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class AuthenticationController {
	constructor(private authenticationService: AuthenticationService, private usersService: UsersService) {}

	@UseGuards(JwtAuthenticationGuard)
	@Get()
	authenticate(@Req() request: RequestWithUser) {
		const user = request.user;
		return user;
	}

	@Post('register')
	async register(@Body() registrationData: RegisterDto): Promise<Token> {
		return this.authenticationService.register(registrationData);
	}

	@HttpCode(200)
	@UseGuards(LocalAuthenticationGuard)
	@Post('login')
	@ApiBody({ type: LogInDto })
	async login(@Req() request: RequestWithUser): Promise<Token> {
		const { user } = request;

		const payload: TokenPayload = { userId: user._id };
		const token = this.authenticationService.sigInToken(payload);

		return {
			token,
		};
	}
}

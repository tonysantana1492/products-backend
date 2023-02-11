import { Controller, Post, Body } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { UsersService } from "../features/users/users.service";

import { LogInDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

import { Token } from "src/authorization/interfaces/token.interface";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthenticationController {
	constructor(private authenticationService: AuthenticationService, private usersService: UsersService) {}

	@Post("/register")
	async register(@Body() registrationData: RegisterDto): Promise<Token> {
		return this.authenticationService.register(registrationData);
	}

	@Post("/login")
	async login(@Body() loginData: LogInDto): Promise<Token> {
		return this.authenticationService.login(loginData);
	}
}

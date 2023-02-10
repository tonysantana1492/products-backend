import { Controller, Request, Get, Post, Body, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import { UsersService } from "../features/users/users.service";
import { CreateUserDto } from "../features/users/dto/create-user.dto";
import { LocalAuthGuard } from "src/authorization/guards/local.guard";
import { JwtAuthGuard } from "src/authorization/guards/jwt.guard";
import { RolesGuard } from "src/authorization/guards/roles.guard";
import { Roles } from "src/authorization/decorators/roles.decorator";
import { Role } from "src/authorization/enums/role.enum";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthenticationController {
	constructor(private authService: AuthenticationService, private usersService: UsersService) {}

	@Post("/register")
	async register(@Body() createUserDTO: CreateUserDto) {
		const user = await this.usersService.create(createUserDTO);
		return user;
	}

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.User)
	@Get("/user")
	getProfile(@Request() req) {
		return req.user;
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@Get("/admin")
	getDashboard(@Request() req) {
		return req.user;
	}
}

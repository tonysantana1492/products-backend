import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./entities/user.entity";

@Controller("users")
@ApiTags("user")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOkResponse({
		description: "All the users have been fetched successfully!",
		type: [User]
	})
	findAll() {
		return this.usersService.getAllUsers();
	}
}

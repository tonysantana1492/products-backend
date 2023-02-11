import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum, MaxLength, Matches } from "class-validator";
import { Role } from "src/authorization/enums/role.enum";

export class RegisterDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		example: "John Doe"
	})
	name: string;

	@IsEmail()
	@ApiProperty({
		example: "test@example.com"
	})
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(20)
	@ApiProperty({
		example: "LongPassword*"
	})
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "Password too weak"
	})
	password: string;

	@IsString()
	@IsNotEmpty()
	@IsEnum(Role)
	@ApiProperty({
		example: "client | admin"
	})
	role: string;
}

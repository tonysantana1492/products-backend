import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional } from "class-validator";

export class RegisterDto {
	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(7)
	password: string;

	@ApiProperty({
		description: "Yo can chosse to user | admin",
		example: "admin"
	})
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	role: string;
}

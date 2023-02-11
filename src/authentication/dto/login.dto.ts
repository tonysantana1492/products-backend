import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsNotEmpty, MinLength } from "class-validator";

export class LogInDto {
	@IsEmail()
	@ApiProperty({
		example: "test@example.com"
	})
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(7)
	@ApiProperty({
		example: "password"
	})
	password: string;
}

import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({
		example: "Alfredo Perez Sotolongo"
	})
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@MaxLength(60)
	readonly name: string;

	@ApiProperty({ example: "alfredo.perez@gmail.com" })
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	readonly email: string;

	@ApiProperty({ example: "client | admin" })
	@IsString()
	@IsNotEmpty()
	readonly role: string;
}

import { IsEmail, IsString, IsNotEmpty, MinLength, MaxLength, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

enum Role {
	Development = "development",
	Production = "production",
	Test = "test"
}

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
	@IsEnum(Role)
	readonly role: string;
}

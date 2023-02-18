import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum, MaxLength, Matches } from 'class-validator';
import { Role } from 'src/authorization/enums/role.enum';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(20)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'Password too weak',
	})
	password: string;

	@IsString()
	@IsNotEmpty()
	@IsEnum(Role)
	role: string;
}

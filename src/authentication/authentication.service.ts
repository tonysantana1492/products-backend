import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from '../features/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../authorization/interfaces/token-payload.interface';
import { WrongCredentialsException } from './exceptions/wrong-credentials.exception';
import { User } from 'src/features/users/entities/user.entity';
import MongoErrorCode from 'src/database/mongoErrorCode.enum';
import { EmailAlreadyExistsException } from 'src/features/users/exceptions/email-already-exists.exception';

@Injectable()
export class AuthenticationService {
	constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

	public async getAllUsers(): Promise<User[]> {
		const users = await this.usersService.getAllUsers();

		return users;
	}

	public async register(registrationData: RegisterDto) {
		const hashedPassword = await bcrypt.hash(registrationData.password, 10);

		try {
			const user = await this.usersService.create({
				...registrationData,
				password: hashedPassword,
			});

			const payload: TokenPayload = { userId: user.id };
			const token = this.sigInToken(payload);

			return {
				token,
			};
		} catch (error) {
			if (error?.code === MongoErrorCode.DuplicateKey) {
				throw new EmailAlreadyExistsException();
			}
			throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public sigInToken(payload: TokenPayload): string {
		return this.jwtService.sign(payload);
	}

	public async getAuthenticatedUser(email: string, plainTextPassword: string) {
		try {
			const user = await this.usersService.getByEmail(email);

			await this.verifyPassword(plainTextPassword, user.password);
			return user;
		} catch (error) {
			throw new WrongCredentialsException();
		}
	}

	public async verifyPassword(plainTextPassword: string, hashedPassword: string) {
		const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

		if (!isPasswordMatching) {
			throw new WrongCredentialsException();
		}
	}
}

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../features/users/users.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { TokenPayload } from "../authorization/interfaces/token-payload.interface";
import { LogInDto } from "./dto/login.dto";
import mongoose from "mongoose";
import { WrongCredentialsException } from "./exceptions/wrong-credentials.exception";
import { User } from "src/features/users/entities/user.entity";

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
			const payload: TokenPayload = await this.usersService.create({
				...registrationData,
				password: hashedPassword
			});

			return {
				access_token: this.sigInToken(payload)
			};
		} catch (error: any) {
			console.log(error);

			if (error?.code === mongoose.Error.ValidationError) {
				throw new HttpException("User with that email already exists", HttpStatus.BAD_REQUEST);
			}
			throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async login({ email, password }: LogInDto) {
		const user = await this.getAuthenticatedUser(email, password);

		const payload: TokenPayload = { userId: user._id };
		return {
			access_token: this.sigInToken(payload)
		};
	}

	private sigInToken(payload: TokenPayload): string {
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

	private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
		const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

		if (!isPasswordMatching) {
			throw new WrongCredentialsException();
		}
	}
}

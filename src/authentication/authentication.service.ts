import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../features/users/users.service";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	public async register(registrationData: RegisterDto) {
		const hashedPassword = await bcrypt.hash(registrationData.password, 10);

		try {
			const createdUser = await this.usersService.create({
				...registrationData,
				password: hashedPassword
			});
			return createdUser;
		} catch (error: any) {
			throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async login(user: any) {
		const payload = { userId: user._id };
		return {
			access_token: this.jwtService.sign(payload)
		};
	}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.getByUsername(username);
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (user && isPasswordMatch) {
			return user;
		}
		return null;
	}

	public async getAuthenticatedUser(email: string, plainTextPassword: string) {
		try {
			const user = await this.usersService.getByEmail(email);
			await this.verifyPassword(plainTextPassword, user.password);
			return user;
		} catch (error) {
			throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
		}
	}

	private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
		const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);

		if (!isPasswordMatching) {
			throw new HttpException("Wrong credentials provided", HttpStatus.BAD_REQUEST);
		}
	}
}

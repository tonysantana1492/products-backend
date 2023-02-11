import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserNotFoundException } from "./exceptions/user-not-found.exception";
import { UserDocument, User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TokenPayload } from "src/authorization/interfaces/token-payload.interface";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	public async create(createUserDto: CreateUserDto): Promise<TokenPayload> {
		const newUser = await this.userModel.create(createUserDto);
		await newUser.save();

		const payload = { userId: newUser._id };

		return payload;
	}

	public async getAllUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	public async getById(id: number): Promise<User> {
		const user = this.userModel.findOne({ _id: id }).exec();

		if (user) {
			return user;
		}
		throw new UserNotFoundException(id);
	}

	public async getByEmail(email: string) {
		const user = await this.userModel.findOne({ email });

		if (user) {
			return user;
		}
		throw new HttpException("User with this email does not exist", HttpStatus.NOT_FOUND);
	}
}

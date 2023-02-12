import { HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserNotFoundException } from "./exceptions/user-not-found.exception";
import { UserDocument, User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TokenPayload } from "src/authorization/interfaces/token-payload.interface";
import { EmailAlreadyExistsException } from "./exceptions/email-already-exists.exception";
import { UserException } from "./exceptions/user.exception";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	public async create(createUserDto: CreateUserDto): Promise<TokenPayload> {
		try {
			const newUser = await this.userModel.create(createUserDto);

			const payload = { userId: newUser._id };

			return payload;
		} catch (error: any) {
			console.log(error);

			if (error?.name === "MongoServerError") throw new EmailAlreadyExistsException();

			throw new UserException("Something", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async getAllUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	public async getById(id: string): Promise<User> {
		const user = this.userModel.findOne({ _id: id }).exec();

		if (user) {
			return user;
		}

		throw new UserNotFoundException(id);
	}

	public async getByEmail(email: string) {
		const user = await this.userModel.findOne({ email }).exec();

		if (user) {
			return user;
		}

		throw new UserException("User with this email does not exist", HttpStatus.NOT_FOUND);
	}
}

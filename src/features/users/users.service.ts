import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserNotFoundException } from "./exceptions/user-not-found.exception";
import * as bcrypt from "bcrypt";
import { UserDocument, User } from "./entities/user.entity";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		return this.userModel.create(createUserDto);
	}

	async getAllUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async getById(id: number): Promise<User> {
		const user = this.userModel.findOne({ _id: id }).exec();

		if (user) {
			return user;
		}
		throw new UserNotFoundException(id);
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
		return this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
			new: true
		});
	}

	async remove(id: string) {
		return this.userModel.findByIdAndRemove({ _id: id }).exec();
	}

	// async getById(id: number) {
	// 	const user = await this.usersRepository.findOne({
	// 		where: {
	// 			id
	// 		}
	// 	});
	// 	if (user) {
	// 		return user;
	// 	}
	// 	throw new UserNotFoundException(id);
	// }

	// async getByEmail(email: string) {
	// 	const user = await this.usersRepository.findOne({
	// 		where: {
	// 			email
	// 		}
	// 	});
	// 	if (user) {
	// 		return user;
	// 	}
	// 	throw new HttpException("User with this email does not exist", HttpStatus.NOT_FOUND);
}

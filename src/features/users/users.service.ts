import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { UserDocument, User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserException } from './exceptions/user.exception';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	public async create(userData: CreateUserDto): Promise<UserDocument> {
		return this.userModel.create(userData);
	}

	public async getAllUsers(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	public async getById(id: string): Promise<User> {
		const user = this.userModel.findById(id).exec();

		if (!user) {
			throw new UserNotFoundException(id);
		}

		return user;
	}

	public async getByEmail(email: string) {
		const user = await this.userModel.findOne({ email }).exec();

		if (!user) {
			throw new UserException('User with this email does not exist', HttpStatus.NOT_FOUND);
		}

		return user;
	}
}

import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../features/users/entities/user.entity';
import { UsersService } from '../../features/users/users.service';
import { mockedJwtService } from '../../utils/mocks/jwt.service';
import { mockedConfigService } from '../../utils/mocks/config.service';
import * as bcrypt from 'bcrypt';
import { mockedUserAdmin } from './user.mock';
import { getModelToken } from '@nestjs/mongoose';
import { Query } from 'mongoose';
import { createMock } from '@golevelup/ts-jest';
import { EmptyLogger } from 'src/utils/empty-logger';

jest.mock('bcrypt');

describe('The AuthenticationService', () => {
	let authenticationService: AuthenticationService;
	let usersService: UsersService;
	let bcryptCompare: jest.Mock;
	let userData: User;
	let findUser: jest.Mock;

	beforeEach(async () => {
		userData = {
			...mockedUserAdmin,
		};
		findUser = jest.fn().mockReturnValue(
			createMock<Query<User, User>>({
				exec: jest.fn().mockReturnValue(userData),
			}) as any,
		);

		const usersRepository = {
			new: jest.fn().mockResolvedValue(userData),
			constructor: jest.fn().mockResolvedValue(userData),
			find: jest.fn(),
			findOne: findUser,
			update: jest.fn(),
			create: jest.fn(),
			remove: jest.fn(),
			exec: jest.fn(),
		};

		bcryptCompare = jest.fn().mockReturnValue(true);
		(bcrypt.compare as jest.Mock) = bcryptCompare;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				AuthenticationService,
				{
					provide: ConfigService,
					useValue: mockedConfigService,
				},
				{
					provide: JwtService,
					useValue: mockedJwtService,
				},
				{
					provide: getModelToken('User'),
					useValue: usersRepository,
				},
			],
		}).compile();

		module.useLogger(new EmptyLogger());
		authenticationService = await module.get<AuthenticationService>(AuthenticationService);
		usersService = await module.get<UsersService>(UsersService);
	});

	describe('when accessing the data of authenticating user', () => {
		it('should attempt to get a user by email', async () => {
			const getByEmailSpy = jest.spyOn(usersService, 'getByEmail');
			await authenticationService.getAuthenticatedUser('user@email.com', 'strongPassword');
			expect(getByEmailSpy).toBeCalledTimes(1);
		});

		describe('and the provided password is not valid', () => {
			beforeEach(() => {
				bcryptCompare.mockReturnValue(false);
			});
			it('should throw an error', async () => {
				await expect(
					authenticationService.getAuthenticatedUser('user@email.com', 'strongPassword'),
				).rejects.toThrow();
			});
		});

		describe('and the provided password is valid', () => {
			beforeEach(() => {
				bcryptCompare.mockReturnValue(true);
			});
			describe('and the user is found in the database', () => {
				it('should return the user data', async () => {
					const user = await authenticationService.getAuthenticatedUser('user@email.com', 'strongPassword');
					expect(user).toBe(userData);
				});
			});

			describe('and the user is not found in the database', () => {
				beforeEach(() => {
					findUser.mockReturnValue(
						createMock<Query<User, User>>({
							exec: jest.fn().mockReturnValue(null),
						}) as any,
					);
				});
				it('should throw an error', async () => {
					await expect(
						authenticationService.getAuthenticatedUser('user@email.com', 'strongPassword'),
					).rejects.toThrow();
				});
			});
		});
	});
});

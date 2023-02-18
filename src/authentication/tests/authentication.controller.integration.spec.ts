import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from '../authentication.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../features/users/entities/user.entity';
import { UsersService } from '../../features/users/users.service';
import { mockedJwtService } from '../../utils/mocks/jwt.service';
import { mockedConfigService } from '../../utils/mocks/config.service';
import { mockedUserClient } from './user.mock';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthenticationController } from '../authentication.controller';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/mongoose';
import { EmptyLogger } from 'src/utils/empty-logger';

describe('The AuthenticationController', () => {
	let app: INestApplication;
	let userData: User;
	// let server: SERVER_TYPE;

	beforeEach(async () => {
		userData = {
			...mockedUserClient,
		};

		const usersRepository = {
			create: jest.fn().mockResolvedValue(userData),
			save: jest.fn().mockReturnValue(Promise.resolve()),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthenticationController],
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
					provide: getModelToken(User.name),
					useValue: usersRepository,
				},
			],
		}).compile();

		module.useLogger(new EmptyLogger());
		app = module.createNestApplication();
		app.useGlobalPipes(new ValidationPipe());
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	describe('when registering', () => {
		describe('and using valid data', () => {
			it('should respond with the token', async () => {
				const tokenData = { access_token: '' };

				await request(app.getHttpServer())
					.post('/auth/register')
					.send({
						name: mockedUserClient.name,
						email: mockedUserClient.email,
						password: mockedUserClient.password,
						role: mockedUserClient.role,
					})
					.expect(tokenData);
			});
		});

		describe('and using invalid data', () => {
			it('should throw an error', () => {
				return request(app.getHttpServer())
					.post('/auth/register')
					.send({
						name: mockedUserClient.name,
					})
					.expect(400);
			});
		});
	});
});

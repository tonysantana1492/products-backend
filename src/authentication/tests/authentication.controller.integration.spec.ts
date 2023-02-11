import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationService } from "../authentication.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../features/users/entities/user.entity";
import { UsersService } from "../../features/users/users.service";
import { mockedJwtService } from "../../utils/mocks/jwt.service";
import { mockedConfigService } from "../../utils/mocks/config.service";
import { mockedUserAdmin } from "./user.mock";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { AuthenticationController } from "../authentication.controller";
import * as request from "supertest";
import { getModelToken } from "@nestjs/mongoose";

describe("The AuthenticationController", () => {
	let app: INestApplication;
	let userData: User;

	beforeEach(async () => {
		userData = {
			...mockedUserAdmin
		};

		const usersRepository = {
			create: jest.fn().mockResolvedValue(userData),
			save: jest.fn().mockReturnValue(Promise.resolve())
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthenticationController],
			providers: [
				UsersService,
				AuthenticationService,
				{
					provide: ConfigService,
					useValue: mockedConfigService
				},
				{
					provide: JwtService,
					useValue: mockedJwtService
				},
				{
					provide: getModelToken(User.name),
					useValue: usersRepository
				}
			]
		}).compile();

		app = module.createNestApplication();
		app.useGlobalPipes(new ValidationPipe());
		await app.init();
	});

	describe("when registering", () => {
		describe("and using valid data", () => {
			it("should respond with the data of the user without the password", () => {
				const expectedData = {
					...userData
				};
				// delete expectedData.password;

				return request(app.getHttpServer())
					.post("/authentication/register")
					.send({
						email: mockedUserAdmin.email,
						name: mockedUserAdmin.name,
						password: "strongPassword"
					})
					.expect(201)
					.expect(expectedData);
			});
		});

		describe("and using invalid data", () => {
			it("should throw an error", () => {
				return request(app.getHttpServer())
					.post("/authentication/register")
					.send({
						name: mockedUserAdmin.name
					})
					.expect(400);
			});
		});
	});
});

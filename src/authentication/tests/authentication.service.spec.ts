import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationService } from "../authentication.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../features/users/entities/user.entity";
import { UsersService } from "../../features/users/users.service";
import { mockedJwtService } from "../../utils/mocks/jwt.service";
import { mockedConfigService } from "../../utils/mocks/config.service";
import { getModelToken } from "@nestjs/mongoose";

describe("The AuthenticationService", () => {
	let authenticationService: AuthenticationService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
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
					useValue: {}
				}
			]
		}).compile();

		authenticationService = await module.get<AuthenticationService>(AuthenticationService);
	});

	describe("when creating a token", () => {
		it("should return a string", () => {
			const userId = "asdasasasas";
			expect(typeof authenticationService.sigInToken({ userId })).toEqual("string");
		});
	});
});

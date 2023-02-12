import { User } from "src/features/users/entities/user.entity";

export const mockedUserAdmin: User = {
	_id: "63e7fb74b085b11315705210",
	name: "John",
	email: "admin@example.com",
	password: "StrongPassword12*",
	role: "admin"
};

export const mockedUserClient: User = {
	_id: "63e7fb74b085b11315705210",
	name: "John",
	email: "client@example.com",
	password: "StrongPassword12*",
	role: "client"
};

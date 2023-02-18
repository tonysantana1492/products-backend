import { HttpStatus } from '@nestjs/common';
import { UserException } from './user.exception';

export class EmailAlreadyExistsException extends UserException {
	constructor() {
		super('User with this email already exists', HttpStatus.BAD_REQUEST);
	}
}

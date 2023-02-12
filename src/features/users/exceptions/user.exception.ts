import { HttpException, Logger } from "@nestjs/common";

export class UserException extends HttpException {
	private readonly logger = new Logger("UserService");

	constructor(message, status) {
		super(message, status);
		this.logger.error(message);
	}
}

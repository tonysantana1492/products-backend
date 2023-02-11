import { HttpException, Logger } from "@nestjs/common";

export class UserException extends HttpException {
	private readonly logger = new Logger("User");

	constructor(message, status) {
		super(message, status);
		this.logger.error(message);
	}
}

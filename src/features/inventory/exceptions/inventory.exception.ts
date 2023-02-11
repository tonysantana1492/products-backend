import { HttpException, Logger } from "@nestjs/common";

export class InventoryException extends HttpException {
	private readonly logger = new Logger("Inventory");

	constructor(message, status) {
		super(message, status);
		this.logger.error(message);
	}
}

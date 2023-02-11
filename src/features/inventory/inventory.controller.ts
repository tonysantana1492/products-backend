import { Controller, Post, Get, Patch, Body, Param, UseGuards } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { CreateInventoryDTO } from "./dto/create-inventory.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "src/authorization/guards/jwt-authentication.guard";
import { RoleGuard } from "src/authorization/guards/role.guard";
import { Role } from "src/authorization/enums/role.enum";
import { Roles } from "src/authorization/decorators/roles.decorator";
import { Inventory } from "./entities/inventory.entity";
import { UpdateInventoryDTO } from "./dto/update-inventory.dto";

@Controller("inventory")
@ApiTags("inventory")
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard, RoleGuard)
export class InventoryController {
	constructor(private inventoryService: InventoryService) {}

	@Roles(Role.Admin)
	@Get("/")
	public async getInventaryProducts(): Promise<Inventory[]> {
		const inventory = await this.inventoryService.getInventaryProducts();
		return inventory;
	}

	@Roles(Role.Admin)
	@Get("/:id")
	public async getinventaryProductById(@Param("id") productId: string): Promise<Inventory> {
		const inventory = await this.inventoryService.getinventaryByProductId(productId);
		return inventory;
	}

	@Roles(Role.Admin)
	@Post("/")
	public async addProductToInventory(@Body() createInventoryDTO: CreateInventoryDTO): Promise<Inventory> {
		const inventory = await this.inventoryService.addProductToInventory(createInventoryDTO);
		return inventory;
	}

	@Roles(Role.Admin)
	@Patch("/reduce/:id")
	public async reduceInventaryProductById(
		@Param("id") productId: string,
		@Body() { amount }: UpdateInventoryDTO
	): Promise<Inventory> {
		const inventory = await this.inventoryService.reduceInventaryByProductId(productId, amount);
		return inventory;
	}

	@Roles(Role.Admin)
	@Patch("/increment/:id")
	public async incrementInventaryProductById(
		@Param("id") productId: string,
		@Body() { amount }: UpdateInventoryDTO
	): Promise<Inventory> {
		const inventory = await this.inventoryService.incrementInventaryByProductId(productId, amount);
		return inventory;
	}
}

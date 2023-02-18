import { Controller, Post, Get, Patch, Body, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDTO } from './dto/create-inventory.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthenticationGuard } from 'src/authorization/guards/jwt-authentication.guard';
import { RoleGuard } from 'src/authorization/guards/role.guard';
import { Role } from 'src/authorization/enums/role.enum';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Inventory } from './entities/inventory.entity';
import { UpdateInventoryDTO } from './dto/update-inventory.dto';
import MongooseClassSerializerInterceptor from 'src/database/mongooseClassSerializer.interceptor';

@Controller('inventory')
@ApiTags('inventory')
@ApiBearerAuth()
@UseInterceptors(MongooseClassSerializerInterceptor(Inventory))
@UseGuards(JwtAuthenticationGuard, RoleGuard)
export class InventoryController {
	constructor(private inventoryService: InventoryService) {}

	@Roles(Role.Admin)
	@Get()
	public async getInventaryProducts(): Promise<Inventory[]> {
		const inventory = await this.inventoryService.getInventaryProducts();
		return inventory;
	}

	@Roles(Role.Admin)
	@Post()
	public async addProductToInventory(@Body() createInventoryDTO: CreateInventoryDTO): Promise<Inventory> {
		const inventory = await this.inventoryService.addProductToInventory(createInventoryDTO);
		return inventory;
	}

	@Roles(Role.Admin)
	@Patch('increment/:productId')
	public async incrementInventaryProductById(
		@Param('productId') productId: string,
		@Body() { amount }: UpdateInventoryDTO,
	): Promise<Inventory> {
		return this.inventoryService.incrementInventaryByProductId(productId, amount);
	}

	@Roles(Role.Client)
	@Get(':productId')
	public async getinventaryProductById(@Param('productId') productId: string): Promise<Inventory> {
		return this.inventoryService.getinventaryByProductId(productId);
	}

	@Roles(Role.Client)
	@Patch('reduce/:productId')
	public async reduceInventaryProductById(
		@Param('productId') productId: string,
		@Body() { amount }: UpdateInventoryDTO,
	): Promise<Inventory> {
		return this.inventoryService.reduceInventaryByProductId(productId, amount);
	}
}

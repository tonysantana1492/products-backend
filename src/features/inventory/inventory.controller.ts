import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException, UseGuards } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { CreateInventoryDTO } from "./dto/create-inventory.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "src/authorization/guards/jwt-authentication.guard";
import { RoleGuard } from "src/authorization/guards/role.guard";
import { Role } from "src/authorization/enums/role.enum";
import { Roles } from "src/authorization/decorators/roles.decorator";

@Controller("products")
@ApiTags("products")
export class ProductController {
	constructor(private inventoryService: InventoryService) {}
}

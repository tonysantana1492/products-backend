import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { FilterProductDTO } from "./dto/filter-product.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "src/authorization/guards/jwt-authentication.guard";
import { RoleGuard } from "src/authorization/guards/role.guard";
import { Role } from "src/authorization/enums/role.enum";
import { Roles } from "src/authorization/decorators/roles.decorator";

@Controller("products")
@ApiTags("products")
export class ProductController {
	constructor(private productService: ProductService) {}

	// TODO Get all products
	@ApiBearerAuth()
	@UseGuards(JwtAuthenticationGuard, RoleGuard)
	@Roles(Role.Admin)
	@Get("/")
	async getProducts(@Query() filterProductDTO: FilterProductDTO) {
		if (Object.keys(filterProductDTO).length) {
			const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
			return filteredProducts;
		} else {
			const allProducts = await this.productService.getAllProducts();
			return allProducts;
		}
	}

	// TODO Add a new product
	@ApiBearerAuth()
	@UseGuards(JwtAuthenticationGuard, RoleGuard)
	@Roles(Role.Admin)
	@Post("/")
	async addProduct(@Body() createProductDTO: CreateProductDTO) {
		const product = await this.productService.addProduct(createProductDTO);
		return product;
	}

	// ? Get ammount of a product
	@ApiBearerAuth()
	@UseGuards(JwtAuthenticationGuard, RoleGuard)
	@Roles(Role.Client)
	@Get("/:id")
	async getProduct(@Param("id") id: string) {
		const product = await this.productService.getProduct(id);
		if (!product) throw new NotFoundException("Product does not exist!");
		return product;
	}

	// ? Buy a product
	@ApiBearerAuth()
	@UseGuards(JwtAuthenticationGuard, RoleGuard)
	@Roles(Role.Client)
	@Put("/:id")
	async updateProduct(@Param("id") id: string, @Body() createProductDTO: CreateProductDTO) {
		const product = await this.productService.updateProduct(id, createProductDTO);
		if (!product) throw new NotFoundException("Product does not exist!");
		return product;
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthenticationGuard, RoleGuard)
	@Roles(Role.Client)
	@Delete("/:id")
	async deleteProduct(@Param("id") id: string) {
		const product = await this.productService.deleteProduct(id);
		if (!product) throw new NotFoundException("Product does not exist");
		return product;
	}
}

import { Product } from "src/features/products/entities/product.entity";

export class CreateInventoryDTO {
	product: Product;
	amount: number;
}

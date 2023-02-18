import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateProductDTO } from 'src/features/products/dto/create-product.dto';

export class CreateInventoryDTO {
	@ApiProperty({
		example: CreateProductDTO,
	})
	product: CreateProductDTO;

	@IsNumber()
	@IsPositive()
	@IsInt()
	@IsNotEmpty()
	@ApiProperty({
		example: 3,
	})
	amount: number;
}

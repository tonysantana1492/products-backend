import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateInventoryDTO {
	@IsNumber()
	@IsPositive()
	@IsInt()
	@IsNotEmpty()
	@ApiProperty({
		default: 3,
	})
	amount: number;
}

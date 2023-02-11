import { ApiProperty } from "@nestjs/swagger";
import { IsPositive, IsString } from "class-validator";

export class CreateProductDTO {
	@IsString()
	@ApiProperty({
		example: "Men’s Chill Crew Neck Sweatshirt"
	})
	name: string;

	@IsString()
	@ApiProperty({
		example: "mens_chill_crew_neck_sweatshirt"
	})
	slug: string;

	@IsString()
	@ApiProperty({
		example:
			"Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester."
	})
	description: string;

	@IsPositive()
	@ApiProperty({
		example: 4.99
	})
	price: number;

	@IsString()
	@ApiProperty({
		example: "shirts"
	})
	category: string;
}

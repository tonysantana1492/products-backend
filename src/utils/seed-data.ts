interface SeedProduct {
	name: string;
	slug: string;
	description: string;
	price: number;
	category: string;
}

export interface SeedUser {
	name: string;
	email: string;
	password: string;
	role: 'admin' | 'client';
}

export interface SeedInventory {
	product: SeedProduct;
	amount: number;
}

export interface SeedData {
	users: SeedUser[];
	inventory: SeedInventory[];
}

export const INITIAL_DATA: SeedData = {
	users: [
		{
			name: 'Admin',
			email: 'admin@example.com',
			password: 'LongPassword*',
			role: 'admin',
		},
		{
			name: 'Client',
			email: 'client@example.com',
			password: 'LongPassword*',
			role: 'client',
		},
	],

	inventory: [
		{
			product: {
				name: 'Men’s Chill Crew Neck Sweatshirt',
				slug: 'mens_chill_crew_neck_sweatshirt',
				description:
					'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',

				price: 75,
				category: 'shirts',
			},
			amount: 4,
		},
		{
			product: {
				name: 'Cybertruck Graffiti Hoodie',
				slug: 'cybertruck_graffiti_hoodie',
				description:
					'As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.',
				price: 60,
				category: 'hoodies',
			},
			amount: 24,
		},
	],
};

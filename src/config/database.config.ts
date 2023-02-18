import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
	mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/productsdb',
}));

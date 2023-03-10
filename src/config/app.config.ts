import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
	// API PORT
	port: parseInt(process.env.PORT, 10) || 3000,

	// API URL
	url: process.env.APP_URL || 'localhost',

	// API Environment: development | production | test
	env: process.env.APP_ENV || 'development',

	// API debug mode is enable or not: true | false
	debugMode: process.env.APP_DEBUG === 'false' ? false : true,

	// sites that are CORS enabled
	frontendURL: process.env.FRONTEND_URL || 'localhost',
}));

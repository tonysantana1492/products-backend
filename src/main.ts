import { VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CustomLogger } from './features/logger/custom-logger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	const configService = app.get(ConfigService);

	app.useLogger(app.get(CustomLogger));

	const logger = new Logger('App');

	app.useGlobalPipes(new ValidationPipe());

	app.setGlobalPrefix('/api');

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	app.enableCors({
		origin: configService.get('app.frontendURL'),
		credentials: true,
	});

	const config = new DocumentBuilder()
		.setTitle('Ecommerce')
		.setDescription('A simple test')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const url = configService.get('app.url');
	const uri = 'api/v1';

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(uri, app, document);

	const port = configService.get('app.port');
	await app.listen(port);
	logger.debug(`Application is running on ${url}:${port}/${uri}`);
}
bootstrap();

import { VersioningType, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { CustomLogger } from "./features/logger/custom-logger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true
	});

	app.useLogger(app.get(CustomLogger));

	app.useGlobalPipes(new ValidationPipe());

	const configService = app.get(ConfigService);

	app.setGlobalPrefix("/api");

	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: "1"
	});

	app.enableCors({
		origin: configService.get("app.frontendURL"),
		credentials: true
	});

	const config = new DocumentBuilder()
		.setTitle("Ecommerce")
		.setDescription("A simple test")
		.setVersion("1.0")
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api/v1", app, document);

	await app.listen(configService.get("app.port"));
}
bootstrap();

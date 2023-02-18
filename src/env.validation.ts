import { plainToClass } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
	Development = 'development',
	Production = 'production',
	Test = 'test',
}

class EnvironmentVariables {
	@IsEnum(Environment)
	@IsNotEmpty()
	APP_ENV: Environment;

	@IsBoolean()
	@IsNotEmpty()
	APP_DEBUG: boolean;

	@IsString()
	@IsNotEmpty()
	APP_URL: string;

	@IsNumber()
	@IsNotEmpty()
	PORT: number;

	@IsString()
	@IsNotEmpty()
	JWT_ACCESS_TOKEN_SECRET: string;

	@IsNumber()
	@IsNotEmpty()
	JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

	@IsString()
	@IsNotEmpty()
	MONGO_URL: string;
}

export function validate(config: Record<string, unknown>) {
	const validatedConfig = plainToClass(EnvironmentVariables, config, {
		enableImplicitConversion: true,
	});
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}

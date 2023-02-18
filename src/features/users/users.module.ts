import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema, User } from './entities/user.entity';

@Module({
	imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
	controllers: [],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}

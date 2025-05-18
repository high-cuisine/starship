import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';

@Module({
    imports:[PrismaModule, AuthModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports:[UsersService]
})
export class UsersModule {}
 
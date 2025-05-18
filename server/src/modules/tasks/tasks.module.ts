import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthModule } from '../auth/auth.module';
import { RefferalsModule } from '../refferals/refferals.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[AuthModule, RefferalsModule, UsersModule],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}

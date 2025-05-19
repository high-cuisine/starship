import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthModule } from '../auth/auth.module';
import { RefferalsModule } from '../refferals/refferals.module';
import { UsersModule } from '../users/users.module';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';

@Module({
  imports:[AuthModule, RefferalsModule, UsersModule, TelegramBotModule],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}

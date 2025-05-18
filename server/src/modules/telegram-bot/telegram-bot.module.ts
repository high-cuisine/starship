import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './telegram-bot.update';
import { UsersModule } from '../users/users.module';
import { RefferalsModule } from '../refferals/refferals.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule, RefferalsModule,  // чтобы читать из process.env
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('TELEGRAM_BOT_TOKEN'),
      }),
    }),
  ],
  providers: [BotUpdate, TelegramBotService]
})
export class TelegramBotModule {}

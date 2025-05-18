import { Update, Start, Hears, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramBotService } from './telegram-bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  @Hears(/^\/start(?:@[A-Za-z0-9_]+)?\s+(\d+)$/)
  async onStartWithRef(@Ctx() ctx: Context & { match: RegExpExecArray }) {
    const refCode = Number(ctx.match[1]);
    await this.telegramBotService.onStartWithRef(ctx, refCode);
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log('ordinary start');
    await this.telegramBotService.onStart(ctx);
  }
}

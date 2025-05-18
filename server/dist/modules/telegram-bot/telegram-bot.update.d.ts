import { Context } from 'telegraf';
import { TelegramBotService } from './telegram-bot.service';
export declare class BotUpdate {
    private readonly telegramBotService;
    constructor(telegramBotService: TelegramBotService);
    onStartWithRef(ctx: Context & {
        match: RegExpExecArray;
    }): Promise<void>;
    onStart(ctx: Context): Promise<void>;
}

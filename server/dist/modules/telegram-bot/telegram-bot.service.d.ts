import { Context } from 'telegraf';
import { UsersService } from '../users/users.service';
import { RefferalsService } from '../refferals/refferals.service';
export declare class TelegramBotService {
    private readonly userService;
    private readonly refService;
    constructor(userService: UsersService, refService: RefferalsService);
    sendBanner(ctx: Context): Promise<void>;
    onStart(ctx: Context): Promise<{
        id: number;
        username: string | null;
        telegramId: bigint;
        multitap: number;
        fastSpeed: number;
        galacticBot: boolean;
        scores: number;
        daysActiveStart: Date;
        daysActiveLast: Date;
        dailyRecharge: number;
        dailyMultiply: number;
    }>;
    onStartWithRef(ctx: Context, reffererId: number): Promise<{
        user: {
            id: number;
            username: string | null;
            telegramId: bigint;
            multitap: number;
            fastSpeed: number;
            galacticBot: boolean;
            scores: number;
            daysActiveStart: Date;
            daysActiveLast: Date;
            dailyRecharge: number;
            dailyMultiply: number;
        };
    }>;
}

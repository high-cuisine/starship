import { Context, Telegraf } from 'telegraf';
import { UsersService } from '../users/users.service';
import { RefferalsService } from '../refferals/refferals.service';
export declare class TelegramBotService {
    private readonly userService;
    private readonly refService;
    private readonly bot;
    constructor(userService: UsersService, refService: RefferalsService, bot: Telegraf);
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
        isTakingDailyReward: boolean;
        dailyRecharge: number;
        dailyMultiply: number;
    }>;
    onStartWithRef(ctx: Context, reffererId: number): Promise<{
        id: number;
        username: string | null;
        telegramId: bigint;
        multitap: number;
        fastSpeed: number;
        galacticBot: boolean;
        scores: number;
        daysActiveStart: Date;
        daysActiveLast: Date;
        isTakingDailyReward: boolean;
        dailyRecharge: number;
        dailyMultiply: number;
    } | {
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
            isTakingDailyReward: boolean;
            dailyRecharge: number;
            dailyMultiply: number;
        };
    }>;
    checkSubscription(userId: number): Promise<boolean>;
}

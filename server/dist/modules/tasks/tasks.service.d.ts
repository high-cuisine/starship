import { PrismaClient } from '@prisma/client';
import { RefferalsService } from '../refferals/refferals.service';
import { UsersService } from '../users/users.service';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
export declare class TasksService {
    private readonly prisma;
    private readonly refService;
    private readonly userService;
    private readonly telegramBotService;
    constructor(prisma: PrismaClient, refService: RefferalsService, userService: UsersService, telegramBotService: TelegramBotService);
    getTasks(userId: number): Promise<{
        userId: number;
        taskId: number;
    }[]>;
    claimTask(userId: number, taskId: number, telegramId: number): Promise<boolean>;
}

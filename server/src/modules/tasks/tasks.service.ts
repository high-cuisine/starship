import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RefferalsService } from '../refferals/refferals.service';
import { UsersService } from '../users/users.service';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Injectable()
export class TasksService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly refService: RefferalsService,
        private readonly userService: UsersService,
        private readonly telegramBotService: TelegramBotService
    ) {}

   

    async getTasks(userId:number) {
        const tasks =  await this.prisma.userTasks.findMany({
            where:{userId: userId}
        });

        return tasks;
    }

    async claimTask(userId:number, taskId:number, telegramId:number) {
        const userTask = await this.prisma.userTasks.findFirst({
            where: {userId, taskId}
        });

        const task = await this.prisma.task.findFirst({
            where: {id: taskId}
        })

        switch(task.type) {
            case 'Ref':
                const count = await this.refService.getRefferalsCount(userId);
                return count >= task.reward
            case 'Leagues':
                const countRef = await this.refService.getRefferalsUsersCount(userId);
                return countRef >= task.reward
            case 'Special':
                return (await this.telegramBotService.checkSubscription(telegramId))
            default:
                return false;
        }
    }


}


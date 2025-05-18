import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RefferalsService } from '../refferals/refferals.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {

    constructor(
        private readonly prisma: PrismaClient,
        private readonly refService: RefferalsService,
        private readonly userService: UsersService
    ) {}

    async createTask(type: 'Ref', reward:number, title:string, target:number) {
        const task = await this.prisma.task.create({
            data: {
                type,
                reward,
                title,
                target
            }
        });

        return task;
    }

    async getTasks(userId:number) {
        const tasks =  await this.prisma.userTasks.findMany({
            where:{userId: userId}
        });

        return tasks;
    }

    async claimTask(userId:number, taskId:number) {
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
                const scores = await this.userService.getUserScores(userId);
                return scores >= task.reward
            case 'Special':
                break;
        }
    }

}

import { PrismaClient } from '@prisma/client';
import { RefferalsService } from '../refferals/refferals.service';
import { UsersService } from '../users/users.service';
export declare class TasksService {
    private readonly prisma;
    private readonly refService;
    private readonly userService;
    constructor(prisma: PrismaClient, refService: RefferalsService, userService: UsersService);
    createTask(type: 'Ref', reward: number, title: string, target: number): Promise<{
        id: number;
        type: import(".prisma/client").$Enums.TaskType;
        reward: number;
        title: string;
        target: number;
    }>;
    getTasks(userId: number): Promise<{
        userId: number;
        taskId: number;
    }[]>;
    claimTask(userId: number, taskId: number): Promise<boolean>;
}

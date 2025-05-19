import { AuthService } from '../auth/auth.service';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly authService;
    private readonly tasksService;
    constructor(authService: AuthService, tasksService: TasksService);
    getTasks(auth: string): Promise<{
        tasks: {
            userId: number;
            taskId: number;
        }[];
    }>;
    completeTask(auth: string, body: {
        taskId: number;
    }): Promise<{
        message: string;
    }>;
}

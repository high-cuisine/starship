import { Controller, Get, Post, Headers, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(
        private readonly authService: AuthService,
        private readonly tasksService: TasksService
    ) {}

    @Get('all')
    async getTasks(@Headers('authorization') auth: string) {
        if (!auth) {
            throw new UnauthorizedException('Authorization header is missing');
        }
        
        const token = auth.replace(/^Bearer\s+/i, '');
        const payload = await this.authService.verifyToken(token);

        const tasks = await this.tasksService.getTasks(payload.sub);

        return { tasks };
    }

    @Post('complete')
    async completeTask(
        @Headers('authorization') auth: string,
        @Body() body: { taskId: number }
    ) {
        if (!auth) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const token = auth.replace(/^Bearer\s+/i, '');
        const payload = await this.authService.verifyToken(token);

        const task = await this.tasksService.claimTask(
            payload.sub, 
            body.taskId, 
            payload.telegramId
        );

        if (!task) {
            throw new BadRequestException('Task not completed');
        }

        return { message: 'Task completed successfully' };
    }
}
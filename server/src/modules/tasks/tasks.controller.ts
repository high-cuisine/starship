import { Controller, Get, Post, Req, Res, Headers } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Get('all')
    async getTasks(
        @Headers('authorization') auth:string, 
        @Req() req: Request,  
        @Res() res: Response
    ) {
        const token = auth.replace(/^Bearer\s+/i, '');
            const payload = await this.authService.verifyToken(token);
    }
}

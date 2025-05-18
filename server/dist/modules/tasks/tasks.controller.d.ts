import { AuthService } from '../auth/auth.service';
export declare class TasksController {
    private readonly authService;
    constructor(authService: AuthService);
    getTasks(auth: string, req: Request, res: Response): Promise<void>;
}

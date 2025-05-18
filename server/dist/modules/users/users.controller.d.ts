import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    savePoints(auth: string, req: Request, res: Response): Promise<void>;
    getProfile(auth: string, res: Response): Promise<Response<any, Record<string, any>>>;
    useDailyBonus(auth: string, req: Request, res: Response): Promise<void>;
    upLevel(auth: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    useDaily(auth: string, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}

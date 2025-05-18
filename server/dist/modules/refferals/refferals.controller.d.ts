import { RefferalsService } from './refferals.service';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';
export declare class RefferalsController {
    private readonly refferalsService;
    private readonly authService;
    constructor(refferalsService: RefferalsService, authService: AuthService);
    getRefferals(auth: string, req: Request, res: Response): Promise<void>;
}

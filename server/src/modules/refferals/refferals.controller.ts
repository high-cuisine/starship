import { Controller, Get, Post, Req, Res, Headers } from '@nestjs/common';
import { RefferalsService } from './refferals.service';
import { AuthService } from '../auth/auth.service';
import { Response } from 'express';

@Controller('refferals')
export class RefferalsController {

    constructor(
        private readonly refferalsService: RefferalsService,
        private readonly authService: AuthService
    ) {}

    @Get('/all')
    async getRefferals(
                    @Headers('authorization') auth:string, 
                    @Req() req: Request, 
                    @Res() res: Response) {
            const token = auth.replace(/^Bearer\s+/i, '');
            const payload = await this.authService.verifyToken(token);

            const refferals = await this.refferalsService.getRefferals(payload.sub);

            res.status(200).json(refferals);
    }
}

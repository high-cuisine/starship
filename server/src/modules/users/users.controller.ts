import { Controller, Get, Post, Req, Res, Headers, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { DailyBonus } from './types/DailyBonus.type';
import { LevelUpInterface } from './types/LevelUp.type';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService
    )
    {}

    @Post('login')
    async login(@Req() req:Request, @Res() res: Response) {
        try {
            const { userId, hash } = req.body;

            if(!userId || !hash) 
                return res.status(400).json('not userId or hash');
            
            const token = await this.userService.login(userId, hash);

            res.status(200).json(token);
        }

        catch(e) {
            console.log(e);
        }
    }

    @Post('/save-points')
    async savePoints(@Headers('authorization') auth:string, @Req() req:Request, @Res() res: Response) {
        try {
            const { points } = req.body;

            if(!auth) {
                throw new BadRequestException('not token');
            }

            const token = auth.replace(/^Bearer\s+/i, '');

            if(!token) {
                throw new BadRequestException('not token');
            }

            const payload = await this.authService.verifyToken(token);

            const scores = await this.userService.savePoints(payload.sub, points);

            res.status(200).json(scores);
        }
        catch(e) {
            console.log(e);
        }
    }

    @Get('/my-profile')
    async getProfile(@Headers('authorization') auth:string,  @Res() res: Response) {

        if(!auth) {
            return res.status(400).json({"message":'not token'});
        }
        const token = auth.replace(/^Bearer\s+/i, '');

        if(!token) {
            return res.status(400).json({"message":'not token'});
        }
        const payload = await this.authService.verifyToken(token);

        res.status(200).json(payload);
    }
 
    @Post('/use-daily')
    async useDailyBonus(
                    @Headers('authorization') auth:string, 
                    @Req() req: Request,  
                    @Res() res: Response
                ) {
        
        if(!auth) {
            new BadRequestException('not auth');
        }
        const token = auth.replace(/^Bearer\s+/i, '');

        if(!token) {
            new BadRequestException('not token');
        }
        const payload = await this.authService.verifyToken(token);
        const { dailyBonusType } = req.body as { dailyBonusType: DailyBonus};

        const status = await this.userService.useDailyBonus(payload.sub, dailyBonusType);

        res.status(200).json(status);
    }

    @Post('up-level')
    async upLevel(
        @Headers('authorization') auth:string,
        @Req() req: Request,
        @Res() res: Response
    )
    {
        if(!auth) {
            throw new BadRequestException('not token');
        }
        const token = auth.replace(/^Bearer\s+/i, '');

        if(!token) {
            throw new BadRequestException('not token');
        }
        const payload = await this.authService.verifyToken(token);

        const { levelType } = req.body as { levelType: LevelUpInterface}

        const response = await this.userService.setLevelUp(payload.sub, levelType);

        return res.status(200).json(response);
    }

    @Post('/use-daily-reward')
    async useDaily(
        @Headers('authorization') auth:string,
        @Req() req: Request,
        @Res() res: Response
    )
    {
        if(!auth) {
            throw new BadRequestException('not token');
        }
        const token = auth.replace(/^Bearer\s+/i, '');

        if(!token) {
            throw new BadRequestException('not token');
        }
        const payload = await this.authService.verifyToken(token);

        const response = await this.userService.useDaily(payload.sub);

        return res.status(200).json(response);
    }
}


// login //auth // update-scores
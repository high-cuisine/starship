import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    async generateToken(userId:number, telegramId:string, scores:number, multitap:number, fastSpeed:number, galacticBot:boolean, dailyRecharge:number, dailyMultiply:number, daysActive:number) {
         const payload = { sub: userId, telegramId, scores, multitap, fastSpeed, galacticBot, dailyRecharge, dailyMultiply, daysActive};

         return {
            accessToken: this.jwtService.sign(payload),
            expiresIn: 3600
         }
    }

    async verifyToken(token:string, options?:JwtVerifyOptions):Promise<jwtDTO> {
        try {
            return this.jwtService.verifyAsync(token, options);
        }
        catch(e) {
            throw new UnauthorizedException('Invalid or exprired JWT');
        }
    }
}

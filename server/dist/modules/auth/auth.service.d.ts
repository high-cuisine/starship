import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateToken(userId: number, telegramId: string, scores: number, multitap: number, fastSpeed: number, galacticBot: boolean, dailyRecharge: number, dailyMultiply: number, daysActive: number): Promise<{
        accessToken: string;
        expiresIn: number;
    }>;
    verifyToken(token: string, options?: JwtVerifyOptions): Promise<jwtDTO>;
}

import { PrismaService } from 'src/core/prisma/Prisma.service';
import { AuthService } from '../auth/auth.service';
import { DailyBonus } from './types/DailyBonus.type';
import { User } from '@prisma/client';
import { LevelUpInterface } from './types/LevelUp.type';
export declare class UsersService {
    private readonly prisma;
    private readonly authService;
    constructor(prisma: PrismaService, authService: AuthService);
    login(userId: number, hash: string): Promise<{
        accessToken: string;
        expiresIn: number;
    }>;
    createUser(telegramId: number, username: string): Promise<{
        id: number;
        username: string | null;
        telegramId: bigint;
        multitap: number;
        fastSpeed: number;
        galacticBot: boolean;
        scores: number;
        daysActiveStart: Date;
        daysActiveLast: Date;
        dailyRecharge: number;
        dailyMultiply: number;
    }>;
    savePoints(userId: number, points: number): Promise<number>;
    useDailyBonus(userId: number, bonusType: DailyBonus): Promise<boolean>;
    getDaysUserActive(user: User): Promise<{
        id: number;
        username: string | null;
        telegramId: bigint;
        multitap: number;
        fastSpeed: number;
        galacticBot: boolean;
        scores: number;
        daysActiveStart: Date;
        daysActiveLast: Date;
        dailyRecharge: number;
        dailyMultiply: number;
    }>;
    getUserScores(userId: number): Promise<number>;
    setLevelUp(userId: number, upgradeType: LevelUpInterface): Promise<{
        status: string;
        type: "mulitap" | "fastspeed" | "galacticbot";
    }>;
    upgradeField<K extends keyof User>(user: User, field: K, cost: number, max?: number, isBoolean?: boolean): Promise<void>;
    getUser(telegramId: number): Promise<{
        id: number;
        username: string | null;
        telegramId: bigint;
        multitap: number;
        fastSpeed: number;
        galacticBot: boolean;
        scores: number;
        daysActiveStart: Date;
        daysActiveLast: Date;
        dailyRecharge: number;
        dailyMultiply: number;
    }>;
    useDaily(id: number): Promise<number>;
}

import { PrismaService } from 'src/core/prisma/Prisma.service';
export declare class RefferalsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getRefferals(userId: number): Promise<({
        referred: {
            id: number;
            username: string;
            scores: number;
        };
    } & {
        id: number;
        referrerId: number;
        referredId: number;
    })[]>;
    addRefferal(reffererId: number, refferedId: number): Promise<{
        id: number;
        referrerId: number;
        referredId: number;
    }>;
    createRefferals(referredId: number, referrerId: number): Promise<{
        id: number;
        referrerId: number;
        referredId: number;
    }>;
    getRefferalsCount(userId: number): Promise<number>;
    getRefferalsUsersCount(userId: number): Promise<number>;
}

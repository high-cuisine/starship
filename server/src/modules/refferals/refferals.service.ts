import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';

@Injectable()
export class RefferalsService {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async getRefferals(userId:number) {
        const refferals = await this.prisma.referral.findMany({
            where: {referredId:userId},
            include: {
                referred: {
                    select: {
                        id: true,
                        username: true,
                        scores: true,
                    }
                }
            }
        });

        return refferals;
    }

    async addRefferal(reffererId:number, refferedId:number) {
        const refferal = await this.prisma.referral.create({
            data: {
                referredId: refferedId,
                referrerId: reffererId
            }
        });

        return refferal;
    }

    async createRefferals(referredId:number, referrerId:number) {
        const ref = await this.prisma.referral.create({
            data: {
                referredId,
                referrerId
            }
        });

        return ref;
    }

    async getRefferalsCount(userId:number) {
        const count = await this.prisma.referral.count({
            where: {referrerId: userId}
        });
        
        return count;
    }

    async getRefferalsUsersCount(userId:number) {
        const count = await this.prisma.referral.count({
            where: {
                referrerId: userId
            }
        });

        return count;
    }
}

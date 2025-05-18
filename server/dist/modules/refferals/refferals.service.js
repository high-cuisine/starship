"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefferalsService = void 0;
const common_1 = require("@nestjs/common");
const Prisma_service_1 = require("../../core/prisma/Prisma.service");
let RefferalsService = class RefferalsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRefferals(userId) {
        const refferals = await this.prisma.referral.findMany({
            where: { referredId: userId },
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
    async addRefferal(reffererId, refferedId) {
        const refferal = await this.prisma.referral.create({
            data: {
                referredId: refferedId,
                referrerId: reffererId
            }
        });
        return refferal;
    }
    async createRefferals(referredId, referrerId) {
        const ref = await this.prisma.referral.create({
            data: {
                referredId,
                referrerId
            }
        });
        return ref;
    }
    async getRefferalsCount(userId) {
        const count = await this.prisma.referral.count({
            where: { referrerId: userId }
        });
        return count;
    }
};
exports.RefferalsService = RefferalsService;
exports.RefferalsService = RefferalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Prisma_service_1.PrismaService])
], RefferalsService);
//# sourceMappingURL=refferals.service.js.map
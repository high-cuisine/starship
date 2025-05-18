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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const Prisma_service_1 = require("../../core/prisma/Prisma.service");
const auth_service_1 = require("../auth/auth.service");
const invalid_data_exception_1 = require("../../common/exceptions/invalid-data.exception");
const levels_1 = require("./constants/levels");
const dailyBonus_1 = require("./constants/dailyBonus");
let UsersService = class UsersService {
    constructor(prisma, authService) {
        this.prisma = prisma;
        this.authService = authService;
    }
    async login(userId, hash) {
        if (!userId || !hash)
            throw new invalid_data_exception_1.InvalidDataException('нету userId или hash');
        let user = await this.prisma.user.findUnique({
            where: { telegramId: userId }
        });
        if (!user) {
            user = await this.createUser(userId, hash);
        }
        await this.getDaysUserActive(user);
        const daysActive = Math.floor(Number(+user.daysActiveLast - +user.daysActiveStart) / 1000 / 3600 / 24);
        return this.authService.generateToken(user.id, user.telegramId.toString(), user.scores, user.multitap, user.fastSpeed, user.galacticBot, user.dailyRecharge, user.dailyMultiply, daysActive);
    }
    async createUser(telegramId, username) {
        let user = await this.prisma.user.findFirst({ where: { telegramId: telegramId } });
        if (!user)
            user = await this.prisma.user.create({
                data: {
                    username: username,
                    telegramId: telegramId,
                    dailyRecharge: 3,
                    dailyMultiply: 3,
                    daysActiveStart: new Date(Date.now()),
                    daysActiveLast: new Date(Date.now())
                }
            });
        return user;
    }
    async savePoints(userId, points) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('not user');
        }
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                scores: user.scores + points
            }
        });
        return points;
    }
    async useDailyBonus(userId, bonusType) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        console.log(bonusType);
        if (!user) {
            throw new common_1.UnauthorizedException('not user');
        }
        if (!bonusType ||
            typeof bonusType !== 'object' ||
            (bonusType.type !== 'recharge' && bonusType.type !== 'multiply')) {
            throw new common_1.BadRequestException('dailyBonusType должен быть объектом { type: "recharge" | "multiply" }');
        }
        if (!bonusType) {
            throw new common_1.BadRequestException('not dailyBonus');
        }
        console.log(user, user.dailyMultiply);
        if (bonusType.type === 'multiply' && user.dailyMultiply < 1 || bonusType.type === 'recharge' && user.dailyRecharge < 1) {
            throw new common_1.BadRequestException('not dailyBonus');
        }
        switch (bonusType.type) {
            case 'multiply':
                await this.prisma.user.update({
                    where: { id: userId },
                    data: {
                        dailyMultiply: user.dailyMultiply - 1
                    }
                });
                break;
            case 'recharge':
                await this.prisma.user.update({
                    where: { id: userId },
                    data: {
                        dailyRecharge: user.dailyRecharge - 1
                    }
                });
                break;
        }
        return true;
    }
    async getDaysUserActive(user) {
        const currentDate = new Date(Date.now());
        const diffInDays = Math.floor((currentDate.getTime() - user.daysActiveLast.getTime()) / (1000 * 60 * 60 * 24));
        if (diffInDays > 2) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    daysActiveStart: new Date(Date.now()),
                    daysActiveLast: new Date(Date.now()),
                }
            });
        }
        else if (diffInDays > 1) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    daysActiveLast: new Date(Date.now()),
                }
            });
        }
        return user;
    }
    async getUserScores(userId) {
        const user = await this.prisma.user.findFirst({ where: { id: userId } });
        return user.scores;
    }
    async setLevelUp(userId, upgradeType) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException('not user');
        }
        switch (upgradeType.type) {
            case 'galacticbot':
                await this.upgradeField(user, 'galacticBot', levels_1.GALACTIC_BOT_LEVEL, 0, true);
                break;
            case 'mulitap':
                await this.upgradeField(user, 'multitap', levels_1.MILITAP_LEVEL, 10);
                break;
            case 'fastspeed':
                await this.upgradeField(user, 'fastSpeed', levels_1.FAST_SPEED_LEVEL, 10);
                break;
        }
        return { status: 'update', type: upgradeType.type };
    }
    async upgradeField(user, field, cost, max = 10, isBoolean = false) {
        if (isBoolean) {
            if (user[field]) {
                throw new common_1.BadRequestException(`${field}d is up`);
            }
            if (cost > user.scores) {
                throw new common_1.BadRequestException('not coins for up level');
            }
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    [field]: true,
                    scores: { decrement: cost }
                }
            });
        }
        else {
            if (typeof user[field] !== 'number') {
                throw new common_1.BadRequestException('not valid field');
            }
            if (user[field] >= max) {
                throw new common_1.BadRequestException(`${field}d is up`);
            }
            if (cost > user.scores) {
                throw new common_1.BadRequestException('not coins for up level');
            }
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    [field]: { incriment: 1 },
                    scores: { decrement: cost }
                }
            });
        }
    }
    async getUser(telegramId) {
        const user = await this.prisma.user.findFirst({ where: { telegramId } });
        return user;
    }
    async useDaily(id) {
        const user = await this.prisma.user.findFirst({ where: { id } });
        const daysActive = Math.floor((Number(user.daysActiveLast) - Number(user.daysActiveStart)) / 1000 / 3600 / 24);
        const currectReward = dailyBonus_1.listDaily[daysActive - 1];
        if (!currectReward) {
            throw new common_1.BadRequestException('1 day is not going now');
        }
        await this.prisma.user.update({
            data: {
                scores: { increment: currectReward.reward }
            },
            where: {
                id
            }
        });
        return currectReward.reward;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map
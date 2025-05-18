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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_service_1 = require("../auth/auth.service");
let UsersController = class UsersController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async login(req, res) {
        try {
            const { userId, hash } = req.body;
            if (!userId || !hash)
                return res.status(400).json('not userId or hash');
            const token = await this.userService.login(userId, hash);
            res.status(200).json(token);
        }
        catch (e) {
            console.log(e);
        }
    }
    async savePoints(auth, req, res) {
        try {
            const { points } = req.body;
            if (!auth) {
                throw new common_1.BadRequestException('not token');
            }
            const token = auth.replace(/^Bearer\s+/i, '');
            if (!token) {
                throw new common_1.BadRequestException('not token');
            }
            const payload = await this.authService.verifyToken(token);
            const scores = await this.userService.savePoints(payload.sub, points);
            res.status(200).json(scores);
        }
        catch (e) {
            console.log(e);
        }
    }
    async getProfile(auth, res) {
        if (!auth) {
            return res.status(400).json({ "message": 'not token' });
        }
        const token = auth.replace(/^Bearer\s+/i, '');
        if (!token) {
            return res.status(400).json({ "message": 'not token' });
        }
        const payload = await this.authService.verifyToken(token);
        res.status(200).json(payload);
    }
    async useDailyBonus(auth, req, res) {
        if (!auth) {
            new common_1.BadRequestException('not auth');
        }
        const token = auth.replace(/^Bearer\s+/i, '');
        if (!token) {
            new common_1.BadRequestException('not token');
        }
        const payload = await this.authService.verifyToken(token);
        const { dailyBonusType } = req.body;
        const status = await this.userService.useDailyBonus(payload.sub, dailyBonusType);
        res.status(200).json(status);
    }
    async upLevel(auth, req, res) {
        if (!auth) {
            throw new common_1.BadRequestException('not token');
        }
        const token = auth.replace(/^Bearer\s+/i, '');
        if (!token) {
            throw new common_1.BadRequestException('not token');
        }
        const payload = await this.authService.verifyToken(token);
        const { levelType } = req.body;
        const response = await this.userService.setLevelUp(payload.sub, levelType);
        return res.status(200).json(response);
    }
    async useDaily(auth, req, res) {
        if (!auth) {
            throw new common_1.BadRequestException('not token');
        }
        const token = auth.replace(/^Bearer\s+/i, '');
        if (!token) {
            throw new common_1.BadRequestException('not token');
        }
        const payload = await this.authService.verifyToken(token);
        const response = await this.userService.useDaily(payload.sub);
        return res.status(200).json(response);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/save-points'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "savePoints", null);
__decorate([
    (0, common_1.Get)('/my-profile'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)('/use-daily'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "useDailyBonus", null);
__decorate([
    (0, common_1.Post)('up-level'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "upLevel", null);
__decorate([
    (0, common_1.Post)('/use-daily-reward'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "useDaily", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map
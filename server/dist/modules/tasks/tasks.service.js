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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const refferals_service_1 = require("../refferals/refferals.service");
const users_service_1 = require("../users/users.service");
const telegram_bot_service_1 = require("../telegram-bot/telegram-bot.service");
let TasksService = class TasksService {
    constructor(prisma, refService, userService, telegramBotService) {
        this.prisma = prisma;
        this.refService = refService;
        this.userService = userService;
        this.telegramBotService = telegramBotService;
    }
    async getTasks(userId) {
        const tasks = await this.prisma.userTasks.findMany({
            where: { userId: userId }
        });
        return tasks;
    }
    async claimTask(userId, taskId, telegramId) {
        const userTask = await this.prisma.userTasks.findFirst({
            where: { userId, taskId }
        });
        const task = await this.prisma.task.findFirst({
            where: { id: taskId }
        });
        switch (task.type) {
            case 'Ref':
                const count = await this.refService.getRefferalsCount(userId);
                return count >= task.reward;
            case 'Leagues':
                const countRef = await this.refService.getRefferalsUsersCount(userId);
                return countRef >= task.reward;
            case 'Special':
                return (await this.telegramBotService.checkSubscription(telegramId));
            default:
                return false;
        }
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient,
        refferals_service_1.RefferalsService,
        users_service_1.UsersService,
        telegram_bot_service_1.TelegramBotService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map
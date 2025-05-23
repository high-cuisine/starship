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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const tasks_service_1 = require("./tasks.service");
let TasksController = class TasksController {
    constructor(authService, tasksService) {
        this.authService = authService;
        this.tasksService = tasksService;
    }
    async getTasks(auth) {
        if (!auth) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        const token = auth.replace(/^Bearer\s+/i, '');
        const payload = await this.authService.verifyToken(token);
        const tasks = await this.tasksService.getTasks(payload.sub);
        return { tasks };
    }
    async completeTask(auth, body) {
        if (!auth) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        const token = auth.replace(/^Bearer\s+/i, '');
        const payload = await this.authService.verifyToken(token);
        const task = await this.tasksService.claimTask(payload.sub, body.taskId, payload.telegramId);
        if (!task) {
            throw new common_1.BadRequestException('Task not completed');
        }
        return { message: 'Task completed successfully' };
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)('complete'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "completeTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const tasks_controller_1 = require("./tasks.controller");
const auth_module_1 = require("../auth/auth.module");
const refferals_module_1 = require("../refferals/refferals.module");
const users_module_1 = require("../users/users.module");
const telegram_bot_module_1 = require("../telegram-bot/telegram-bot.module");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, refferals_module_1.RefferalsModule, users_module_1.UsersModule, telegram_bot_module_1.TelegramBotModule],
        providers: [tasks_service_1.TasksService],
        controllers: [tasks_controller_1.TasksController]
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map
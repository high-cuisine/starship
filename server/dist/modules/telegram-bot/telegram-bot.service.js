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
exports.TelegramBotService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const users_service_1 = require("../users/users.service");
const refferals_service_1 = require("../refferals/refferals.service");
const path_1 = require("path");
let TelegramBotService = class TelegramBotService {
    constructor(userService, refService) {
        this.userService = userService;
        this.refService = refService;
    }
    async sendBanner(ctx) {
        const photoPath = (0, path_1.join)(__dirname, '..', '..', 'assets', 'banner.jpg');
        console.log(photoPath);
        await ctx.replyWithPhoto({ source: photoPath }, {
            caption: 'Hello, dear friend, we created this project for entertainment purposes, but no one knows what the result will be, perhaps your game will bring something more than entertainment. Be patient and assemble your team, with which you will go forward. Together we will achieve great results.',
            reply_markup: telegraf_1.Markup.inlineKeyboard([
                [telegraf_1.Markup.button.webApp('Играть', 'https://worldcoin2025.space')]
            ]).reply_markup
        });
    }
    async onStart(ctx) {
        const user = await this.userService.createUser(ctx.from.id, ctx.from.username);
        this.sendBanner(ctx);
        return user;
    }
    async onStartWithRef(ctx, reffererId) {
        const user = await this.userService.createUser(ctx.from.id, ctx.from.username);
        const userRef = await this.userService.getUser(reffererId);
        console.log(user, userRef);
        if (userRef) {
            await this.refService.createRefferals(user.id, userRef.id);
        }
        this.sendBanner(ctx);
        return { user };
    }
};
exports.TelegramBotService = TelegramBotService;
exports.TelegramBotService = TelegramBotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        refferals_service_1.RefferalsService])
], TelegramBotService);
//# sourceMappingURL=telegram-bot.service.js.map
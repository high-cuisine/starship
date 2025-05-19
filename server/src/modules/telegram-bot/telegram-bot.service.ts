import { Injectable } from '@nestjs/common';
import { Context, Markup, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { UsersService } from '../users/users.service';
import { RefferalsService } from '../refferals/refferals.service';
import { join } from 'path';

const CHANNEL_ID = '-1002168697912';

@Injectable()
export class TelegramBotService {

    constructor(
        private readonly userService: UsersService,
        private readonly refService: RefferalsService,
        @InjectBot() private readonly bot: Telegraf
    ) {}

    async sendBanner(ctx:Context) {

        const photoPath = join(__dirname, '..', '..', 'assets', 'banner.jpg');
        console.log(photoPath);
       
        await ctx.replyWithPhoto(
            { source: photoPath },
            {
                caption: 'Hello, dear friend, we created this project for entertainment purposes, but no one knows what the result will be, perhaps your game will bring something more than entertainment. Be patient and assemble your team, with which you will go forward. Together we will achieve great results.',
                reply_markup: Markup.inlineKeyboard([
                    [Markup.button.webApp('Играть', 'https://worldcoin2025.space')]
                ]).reply_markup
            }
        );

    }

    async onStart(ctx:Context) {
        const user = await this.userService.createUser(ctx.from.id, ctx.from.username);
        this.sendBanner(ctx);
        return user;
    }

    async onStartWithRef(ctx:Context, reffererId:number) {

        if(ctx.from.id === reffererId) {
            return this.onStart(ctx);
        }

        const user = await this.userService.createUser(ctx.from.id, ctx.from.username);
        const userRef = await this.userService.getUser(reffererId);
        console.log(user, userRef);
        if(userRef) {
            await this.refService.createRefferals(user.id, userRef.id);
        }
        
        this.sendBanner(ctx);
        return {user};
    }

    async checkSubscription(userId:number) {
        const member = await this.bot.telegram.getChatMember(CHANNEL_ID, userId);
        const status = ['member', 'administrator', 'creator'].includes(member.status);

        return status;
    }
}
 
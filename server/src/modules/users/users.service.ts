import { BadRequestException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/Prisma.service';
import { AuthService } from '../auth/auth.service';
import { InvalidDataException } from 'src/common/exceptions/invalid-data.exception';
import { DailyBonus } from './types/DailyBonus.type';
import { User } from '@prisma/client';
import { LevelUpInterface } from './types/LevelUp.type';
import { FAST_SPEED_LEVEL, GALACTIC_BOT_LEVEL, MILITAP_LEVEL } from './constants/levels';
import { IsNumber } from 'class-validator';
import { listDaily } from './constants/dailyBonus';

@Injectable()
export class UsersService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService
    )
    {}

    async login(userId:number, hash:string) {
        if(!userId || !hash) throw new InvalidDataException('нету userId или hash');

        let user = await this.prisma.user.findUnique({
            where: {telegramId: userId}
        });
        

        if(!user) {
            user = await this.createUser(userId, hash);
        }

        await this.getDaysUserActive(user);

        const daysActive = Math.floor(Number(+user.daysActiveLast - +user.daysActiveStart) / 1000 / 3600 / 24)
        return this.authService.generateToken(user.id, user.telegramId.toString(), user.scores, user.multitap, user.fastSpeed, user.galacticBot, user.dailyRecharge, user.dailyMultiply, daysActive)
    }

    async createUser(telegramId:number, username:string) {
        let user = await this.prisma.user.findFirst({where:{telegramId:telegramId}});
        
        if(!user)
        user = await this.prisma.user.create({
            data: {
                username: username,
                telegramId: telegramId,
                dailyRecharge: 3, 
                dailyMultiply: 3, 
                daysActiveStart: new Date(Date.now()),
                daysActiveLast: new Date(Date.now())
            }
        })

        return user;
    }

    async savePoints(userId:number, points:number) {
        const user = await this.prisma.user.findUnique({where:{id:userId}});

        if(!user) {
            throw new UnauthorizedException('not user');
        }

        await this.prisma.user.update({
            where: {id:userId},
            data: {
                scores: user.scores + points
            }
        });


        return points;
    }

    async useDailyBonus(userId:number, bonusType:DailyBonus) {
        const user = await this.prisma.user.findUnique({where:{id:userId}});

        console.log(bonusType);

        if(!user) {
            throw new UnauthorizedException('not user');
        }

        if (
            !bonusType ||
            typeof bonusType !== 'object' ||
            (bonusType.type !== 'recharge' && bonusType.type !== 'multiply')
          ) {
            throw new BadRequestException(
              'dailyBonusType должен быть объектом { type: "recharge" | "multiply" }'
            );
          }

        if(!bonusType) {
            throw new BadRequestException('not dailyBonus')
        }

        console.log(user, user.dailyMultiply)

        if(bonusType.type === 'multiply' && user.dailyMultiply < 1 || bonusType.type === 'recharge' && user.dailyRecharge < 1) {
            throw new BadRequestException('not dailyBonus');
        }

        switch(bonusType.type) {
            case 'multiply':
                await this.prisma.user.update({
                    where: {id:userId},
                    data: {
                        dailyMultiply: user.dailyMultiply - 1
                    }
                });

                break;
            case 'recharge':
                await this.prisma.user.update({
                    where: {id:userId},
                    data: {
                        dailyRecharge: user.dailyRecharge - 1
                    }
                });

                break;
        }

        return true;
    }

    async getDaysUserActive(user: User) {
        const currentDate = new Date(Date.now());
        const diffInDays = Math.floor((currentDate.getTime() - user.daysActiveLast.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffInDays > 2) {
            await this.prisma.user.update({
                where: {id: user.id},
                data: {
                    daysActiveStart: new Date(Date.now()),
                    daysActiveLast: new Date(Date.now()),
                }
            });
        }
        else if(diffInDays > 1) {
            await this.prisma.user.update({
                where: {id: user.id},
                data: {
                    daysActiveLast: new Date(Date.now()),
                }
            });
        }

        return user;
    }

    async getUserScores(userId:number) {
        const user = await this.prisma.user.findFirst({where:{id:userId}});

        return user.scores
    }

    async setLevelUp(userId:number, upgradeType:LevelUpInterface) {
        const user = await this.prisma.user.findUnique({where: {id:userId}});


        if(!user) {
            throw new BadRequestException('not user');
        }
        
        switch(upgradeType.type) {
            case 'galacticbot':
                await this.upgradeField(user, 'galacticBot', GALACTIC_BOT_LEVEL, 0, true);
                break;
            case 'mulitap':
                await this.upgradeField(user, 'multitap', MILITAP_LEVEL, 10);
                break;
            case 'fastspeed':
                await this.upgradeField(user, 'fastSpeed', FAST_SPEED_LEVEL, 10);
                break;
        }

        return {status:'update', type:upgradeType.type}
    }

    async upgradeField<K extends keyof User> (user:User, field:K, cost:number, max:number = 10, isBoolean:boolean = false)  {
        if(isBoolean) {
            if(user[field]) {
               throw new BadRequestException(`${field}d is up`)
            }
    
            if(cost > user.scores) {
                throw new BadRequestException('not coins for up level')
            }
    
            await this.prisma.user.update({
                where: {id:user.id},
                data: {
                    [field]: true,
                    scores: {decrement: cost}
                }
            }); 
        }
        else {
            if(typeof user[field] !== 'number') {
                throw new BadRequestException('not valid field')
            }

            if(user[field] as number >= max) {
                throw new BadRequestException(`${field}d is up`)
            }
    
            if(cost > user.scores) {
                throw new BadRequestException('not coins for up level')
            }
    
            await this.prisma.user.update({
                where: {id:user.id},
                data: {
                    [field]: {incriment: 1},
                    scores: {decrement: cost}
                }
            });
        }

        
    }

    async getUser(telegramId:number) {
        const user = await this.prisma.user.findFirst({where:{telegramId}});
        return user;
    }

    async useDaily(id:number) {
        const user = await this.prisma.user.findFirst({where:{id}});

        const daysActive = Math.floor((Number(user.daysActiveLast) - Number(user.daysActiveStart)) / 1000 / 3600 / 24);

        const currectReward = listDaily[daysActive - 1];

        if(!currectReward) {
            throw new BadRequestException('1 day is not going now');
        }

        await this.prisma.user.update({
            data: {
                scores: {increment: currectReward.reward}
            },
            where: {
                id
            }
        });

        return currectReward.reward;
    }
}


import { $authHost, $host } from "..";
import { IDailyBonus } from "../../../entities/Requests/IDaily";
import { LevelUpInterface } from "../../../entities/Requests/ILevelUp";
import { IAuth } from "../../../entities/Response/IAuth";

class UserService {
    async login(userId:number, hash:string):Promise<IAuth> {
        const res = await $host.post<IAuth>('/api/users/login', {
           userId:1042650483,
            hash:"wef"
            // userId,
            // hash
        });

        return res.data
    }

    async savePoints(points:number) {
        const res = await $authHost.post('/api/users/save-points', {
            points
        });

        return res.data
    }

    async setDaily(dailyBonusType:IDailyBonus) {
        const res = await $authHost.post('/api/users/use-daily', {
            dailyBonusType
        });

        return res.data
    }

    async buyingLevelUp(upgradeType:LevelUpInterface) {
        const res = await $authHost.post('/api/users/up-level', {
            upgradeType
        });

        return res.data
    }

    async setDailyReward():Promise<number> {
        const res = await $authHost.post('/api/users/use-daily-reward');

        return res.data
    }
}

export default new UserService();
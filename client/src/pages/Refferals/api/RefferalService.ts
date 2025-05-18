import { $authHost } from "../../../features/api";
import { IRefferalDTO } from "../model/IRefferal.dto";

class RefferalService {
    async getRefferals():Promise<IRefferalDTO[]> {
        const res = await $authHost.get<IRefferalDTO[]>('/api/refferals/all');

        return res.data;
    }
}

export default new RefferalService()
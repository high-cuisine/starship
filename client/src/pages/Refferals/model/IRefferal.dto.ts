export interface IRefferalDTO {
    id: number,
    referrerId: number,
    referredId: number,
    referred: {
        id: number,
        username: string,
        scores: number
    }
}
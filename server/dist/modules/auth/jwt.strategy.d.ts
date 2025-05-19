import { Strategy } from "passport-jwt";
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: jwtDTO): Promise<{
        sub: number;
        telegramId: number;
        scores: number;
        multitap: number;
        fastSpeed: number;
        galacticBot: number;
        dailyRecharge: number;
        dailyMultiply: number;
        userId: number;
    }>;
}
export {};

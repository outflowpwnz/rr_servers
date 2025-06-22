import { TgUserService } from "src/tg-user/tg-user.service";
import { TContext } from "./bot.types";
export declare class BotHelpers {
    private readonly tgUserService;
    constructor(tgUserService: TgUserService);
    getResourceId(ctx: TContext): number | null;
    assertUserExists(ctx: TContext): Promise<boolean>;
}

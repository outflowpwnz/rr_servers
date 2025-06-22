import { Injectable } from "@nestjs/common";
import { TgUserService } from "src/tg-user/tg-user.service";
import { COMMANDS, TContext } from "./bot.types";
import { Markup } from "telegraf";


@Injectable()
export class BotHelpers {
  constructor(private readonly tgUserService: TgUserService) {}

  getResourceId (ctx: TContext) {
    const resourceId = ctx.match ? Number(ctx.match[1]) : null;
    return resourceId
  }

  async assertUserExists(ctx: TContext): Promise<boolean> {
    try {
      const user = await this.tgUserService.getTgUser(ctx.from?.id);

      if (!user) {
        await ctx.reply(`🚫 Вы не зарегистрированы -> /${COMMANDS.CHECK_ID}`);
        return false;
      }
      return true;
    } catch (e) {
      await ctx.reply(e.message);
      return false
    }
  }

}
import { Scene, SceneEnter, SceneLeave, Command, Action } from 'nestjs-telegraf';
import { ACTIONS, COMMANDS, SCENES, TContext, TTakeResourceState } from '../bot.types';
import { ResourceService } from 'src/resource/resource.service';
import { Markup } from 'telegraf';


@Scene(SCENES.TAKE_RESOURCE)
export class TakeResource {
  constructor(private readonly resourceService: ResourceService) {}

  @SceneEnter()
  async onSceneEnter(ctx: TContext) {
    try {
      const resource = await this.resourceService.getResource((ctx.scene.state as TTakeResourceState).resourceId)

      if (!resource) {
        await ctx.reply('Ресурс не найден 🤔');
        await ctx.scene.leave();
        return
      }

      let text = `Ты планируешь занять ${resource.url}\nОписание: ${resource.description}`

      if (resource?.tgUser) {
        text += `\n Последним тут был: @${resource.tgUser.name}`
      }

      const buttons = [
        Markup.button.callback('Принято', ACTIONS.TAKE_ONE),
        Markup.button.callback('Отмена', ACTIONS.LEAVE),
      ]
      await ctx.reply(text, Markup.inlineKeyboard(buttons))
    } catch (e) {
      return e.message
    }
  }

  @Action(ACTIONS.TAKE_ONE)
  async onTakeCommand(ctx: TContext) {
    try {
      const { resourceId, userTgId } = ctx.scene.state as TTakeResourceState
      const resourceToPeek = await this.resourceService.getResource(resourceId);
      if (resourceToPeek?.isFree) {
        this.resourceService.takeResource(resourceId, userTgId)
        await ctx.reply('Работаем 🧑‍💻');
      } else {
        await ctx.reply(`🤔 @${resourceToPeek?.tgUser?.name} уже занял ресурс`);
      }
      await ctx.scene.leave();
    } catch (e) {
      await ctx.reply(`Что-то пошло не так 😬 ${e.message}`);
      await ctx.scene.leave();
    }
  }

  @Action(ACTIONS.LEAVE)
  async onLeaveCommand(ctx: TContext): Promise<void> {
    await ctx.reply('Пока 🖖');
    await ctx.scene.leave();
  }
}
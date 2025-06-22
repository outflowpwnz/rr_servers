import { Scene, SceneEnter, SceneLeave, Command, Action } from 'nestjs-telegraf';
import { ACTIONS, COMMANDS, SCENES, TContext, TFreeResourceState } from '../bot.types';
import { ResourceService } from 'src/resource/resource.service';
import { Markup } from 'telegraf';


@Scene(SCENES.FREE_RESOURCE)
export class FreeResource {
  constructor(private readonly resourceService: ResourceService) {}

  @SceneEnter()
  async onSceneEnter(ctx: TContext) {
    try {
      const { resourceId, userTgId } = ctx.scene.state as TFreeResourceState
      const resource = await this.resourceService.getResource(resourceId)

      if (!resource) {
        await ctx.reply('Ресурс не найден 🤔');
        await ctx.scene.leave();
        return
      }

      const isResourceBusyByMe = resource.tgUser?.tgId === userTgId && !resource.isFree

      if (!isResourceBusyByMe) {
        throw new Error('Ресурс уже свободен или занят другим 😬')
      }

      let text = `Ты планируешь освободить ${resource.url}\nОписание: ${resource.description}\nПредупреждение: ${resource.endMessage?.text}`

      const buttons = [
        Markup.button.callback('Продолжить', ACTIONS.FREE_ONE),
        Markup.button.callback('Отмена', ACTIONS.LEAVE),
      ]
      await ctx.reply(text, Markup.inlineKeyboard(buttons))
    } catch (e) {
      await ctx.reply(`Что-то пошло не так 😬 ${e.message}`);
      await ctx.scene.leave();
    }
  }

  @Action(ACTIONS.FREE_ONE)
  async onFreeCommand(ctx: TContext) {
    try {
      const { resourceId, userTgId } = ctx.scene.state as TFreeResourceState
      await this.resourceService.freeResource(resourceId, userTgId)
      const resource = await this.resourceService.getResource(resourceId)
      if (resource?.isFree) {
        await ctx.reply(`Ресурс ${resource.url} освобожден 🧑‍💻`);
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
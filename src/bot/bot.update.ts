import { Update, Command, Ctx, Action } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { ACTIONS, COMMANDS, SCENES, TContext } from './bot.types';
import { ResourceService } from 'src/resource/resource.service';
import { BotHelpers } from './bot.helpers';
import { Resource } from 'src/resource/resource.entity';

@Update()
export class BotUpdate {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly botHelpers: BotHelpers,
    ) {}

  @Command(COMMANDS.START)
  async onStart(@Ctx() ctx: TContext) {
    await ctx.reply('Привет 👋🏿! Напиши /list, чтобы увидеть списрок ресурсов 📋.');
  }

  @Command(COMMANDS.HELP)
  async onHelp(@Ctx() ctx: TContext) {
    await ctx.reply('текст помощи');
  }

  @Command(COMMANDS.LIST)
  async onList(@Ctx() ctx: TContext) {
    if (!(await this.botHelpers.assertUserExists(ctx))) return;

    const resourceList = await this.resourceService.getResourceList();

    const prepareServerItem = (serverItem: Resource): Parameters<typeof Markup.button.callback> => {
      if (!serverItem.isFree) {
        return [`🛑 ${serverItem.url} (${serverItem.tgUser?.name})`, `disabled_${serverItem.id}`]
      }
  
      return [`✅ ${serverItem.url}`, `take_${serverItem.id}`]
    }

    const buttons = resourceList.map((serverItem) => [Markup.button.callback(...prepareServerItem(serverItem))])

    ctx.reply('Список ресурсов:\n🛑- занят\n✅ - свободен', Markup.inlineKeyboard(buttons))
  }

  @Command(COMMANDS.CHECK_ID)
  async onCheckId(@Ctx() ctx: TContext) {
    ctx.reply(`ID: ${ctx.from?.id}\nUser name: ${ctx.from?.username}\nПередай эту инфу @olegthegoodboy, он тебя зарегает`)
  }

  @Command(COMMANDS.BUSY_LIST)
  async onBusyList(@Ctx() ctx: TContext) {
    if (!(await this.botHelpers.assertUserExists(ctx))) return;

    const resourceList = await this.resourceService.getUserTakenResourceList(ctx.from?.id);

    const prepareServerItem = (serverItem: Resource): Parameters<typeof Markup.button.callback> => {
      return [`🛑 ${serverItem.url} (${serverItem.tgUser?.name})`, `free_${serverItem.id}`]
    }
    const buttons = resourceList.map((serverItem) => [Markup.button.callback(...prepareServerItem(serverItem))])

    if (buttons.length) {
      ctx.reply('😎 Список занятых тобой ресурсов:', Markup.inlineKeyboard(buttons))
    } else {
      ctx.reply('😎 У тебя нету занятых ресурсов')
    }
  }

  @Action(ACTIONS.TAKE)
  async onTakeServerClick (@Ctx() ctx: TContext) {
    if (!(await this.botHelpers.assertUserExists(ctx))) return;
    
    const resourceId = this.botHelpers.getResourceId(ctx)

    ctx.scene.enter(SCENES.TAKE_RESOURCE, { resourceId, userTgId: ctx.from?.id })
  }

  @Action(ACTIONS.FREE)
  async onFreeServerClick (@Ctx() ctx: TContext) {
    if (!(await this.botHelpers.assertUserExists(ctx))) return;
  
    const resourceId = this.botHelpers.getResourceId(ctx)
    ctx.scene.enter(SCENES.FREE_RESOURCE, { resourceId, userTgId: ctx.from?.id })
  }

  @Action(ACTIONS.DISABLED)
  async onDisabledServerClick (@Ctx() ctx: TContext) {
    if (!(await this.botHelpers.assertUserExists(ctx))) return;
    const resourceId = this.botHelpers.getResourceId(ctx)

    if (!resourceId) {
      return ctx.reply('🤔 Не найден ресурс')
    }

    const resource = await this.resourceService.getResource(resourceId);
    const TOMSK_UTC_OFFSET = 7
    resource?.updatedAt.setHours(resource?.updatedAt.getHours() + TOMSK_UTC_OFFSET)
    ctx.reply(`url: ${resource?.url}\nЗанят: @${resource?.tgUser?.name}\nДата: ${resource?.updatedAt}`)
  }
}
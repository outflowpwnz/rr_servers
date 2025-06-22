import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ResourceService } from 'src/resource/resource.service';
import { TgUserService } from 'src/tg-user/tg-user.service';
import { BotHelpers } from './bot.helpers';
import { Markup, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { COMMANDS } from './bot.types';

@Injectable()
export class BotService {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly tgUserService: TgUserService,
    @InjectBot() private readonly bot: Telegraf,
    ) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    // @Cron(CronExpression.EVERY_30_SECONDS)
    async handleNotifyNotFreeResources() {
      const resources = await this.resourceService.getResourceList()
      const notFreeResources = resources.filter((resourceItem) => !resourceItem.isFree)
  
      
      notFreeResources.forEach((resourceItem) => {
        if (resourceItem.tgUser?.tgId) {
          const button = Markup.button.callback(`Освободить ${resourceItem.url}`, `free_${resourceItem.id}`)
          this.bot.telegram.sendMessage(resourceItem.tgUser.tgId, `Еще работаешь на ${resourceItem.url}?`, {
            reply_markup: {
              inline_keyboard: [[button]]
            }
          })
        }
      })
    }
    @Cron(CronExpression.EVERY_DAY_AT_2AM)
    // @Cron(CronExpression.EVERY_10_SECONDS)
    async handleEveryDayNotifyNotFreeResources() {
      const resources = await this.resourceService.getResourceList()
      const notFreeResources = resources.filter((resourceItem) => !resourceItem.isFree)
      let message = `😎 Привет, это ежедневное сообщение!\nВсе ресурсы из /${COMMANDS.LIST} свободны`
      if (notFreeResources.length) {
        message = `😬 Привет, это ежедневное сообщение!\nЗанятые ресурсы:\n${notFreeResources.map((resourceItem) => `${resourceItem.url} - @${resourceItem.tgUser?.name}`).join('\n')}`
      }
      const users = await this.tgUserService.getTgUsers()
      users.forEach((userItem) => {
        this.bot.telegram.sendMessage(userItem.tgId, message)
      })
    }
}

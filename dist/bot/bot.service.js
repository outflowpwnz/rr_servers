"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const resource_service_1 = require("../resource/resource.service");
const tg_user_service_1 = require("../tg-user/tg-user.service");
const telegraf_1 = require("telegraf");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const bot_types_1 = require("./bot.types");
let BotService = class BotService {
    resourceService;
    tgUserService;
    bot;
    constructor(resourceService, tgUserService, bot) {
        this.resourceService = resourceService;
        this.tgUserService = tgUserService;
        this.bot = bot;
    }
    async handleNotifyNotFreeResources() {
        const resources = await this.resourceService.getResourceList();
        const notFreeResources = resources.filter((resourceItem) => !resourceItem.isFree);
        notFreeResources.forEach((resourceItem) => {
            if (resourceItem.tgUser?.tgId) {
                const button = telegraf_1.Markup.button.callback(`Освободить ${resourceItem.url}`, `free_${resourceItem.id}`);
                this.bot.telegram.sendMessage(resourceItem.tgUser.tgId, `Еще работаешь на ${resourceItem.url}?`, {
                    reply_markup: {
                        inline_keyboard: [[button]]
                    }
                });
            }
        });
    }
    async handleEveryDayNotifyNotFreeResources() {
        const resources = await this.resourceService.getResourceList();
        const notFreeResources = resources.filter((resourceItem) => !resourceItem.isFree);
        let message = `😎 Привет, это ежедневное сообщение!\nВсе ресурсы из /${bot_types_1.COMMANDS.LIST} свободны`;
        if (notFreeResources.length) {
            message = `😬 Привет, это ежедневное сообщение!\nЗанятые ресурсы:\n${notFreeResources.map((resourceItem) => `${resourceItem.url} - @${resourceItem.tgUser?.name}`).join('\n')}`;
        }
        const users = await this.tgUserService.getTgUsers();
        users.forEach((userItem) => {
            this.bot.telegram.sendMessage(userItem.tgId, message);
        });
    }
};
exports.BotService = BotService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BotService.prototype, "handleNotifyNotFreeResources", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BotService.prototype, "handleEveryDayNotifyNotFreeResources", null);
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [resource_service_1.ResourceService,
        tg_user_service_1.TgUserService,
        telegraf_1.Telegraf])
], BotService);
//# sourceMappingURL=bot.service.js.map
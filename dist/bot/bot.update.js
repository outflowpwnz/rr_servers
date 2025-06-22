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
exports.BotUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const bot_types_1 = require("./bot.types");
const resource_service_1 = require("../resource/resource.service");
const bot_helpers_1 = require("./bot.helpers");
let BotUpdate = class BotUpdate {
    resourceService;
    botHelpers;
    constructor(resourceService, botHelpers) {
        this.resourceService = resourceService;
        this.botHelpers = botHelpers;
    }
    async onStart(ctx) {
        await ctx.reply('Привет 👋🏿! Напиши /list, чтобы увидеть списрок ресурсов 📋.');
    }
    async onHelp(ctx) {
        await ctx.reply('текст помощи');
    }
    async onList(ctx) {
        if (!(await this.botHelpers.assertUserExists(ctx)))
            return;
        const resourceList = await this.resourceService.getResourceList();
        const prepareServerItem = (serverItem) => {
            if (!serverItem.isFree) {
                return [`🛑 ${serverItem.url} (${serverItem.tgUser?.name})`, `disabled_${serverItem.id}`];
            }
            return [`✅ ${serverItem.url}`, `take_${serverItem.id}`];
        };
        const buttons = resourceList.map((serverItem) => [telegraf_1.Markup.button.callback(...prepareServerItem(serverItem))]);
        ctx.reply('Список ресурсов:\n🛑- занят\n✅ - свободен', telegraf_1.Markup.inlineKeyboard(buttons));
    }
    async onCheckId(ctx) {
        ctx.reply(`ID: ${ctx.from?.id}\nUser name: ${ctx.from?.username}\nПередай эту инфу @olegthegoodboy, он тебя зарегает`);
    }
    async onBusyList(ctx) {
        if (!(await this.botHelpers.assertUserExists(ctx)))
            return;
        const resourceList = await this.resourceService.getUserTakenResourceList(ctx.from?.id);
        const prepareServerItem = (serverItem) => {
            return [`🛑 ${serverItem.url} (${serverItem.tgUser?.name})`, `free_${serverItem.id}`];
        };
        const buttons = resourceList.map((serverItem) => [telegraf_1.Markup.button.callback(...prepareServerItem(serverItem))]);
        if (buttons.length) {
            ctx.reply('😎 Список занятых тобой ресурсов:', telegraf_1.Markup.inlineKeyboard(buttons));
        }
        else {
            ctx.reply('😎 У тебя нету занятых ресурсов');
        }
    }
    async onTakeServerClick(ctx) {
        if (!(await this.botHelpers.assertUserExists(ctx)))
            return;
        const resourceId = this.botHelpers.getResourceId(ctx);
        ctx.scene.enter(bot_types_1.SCENES.TAKE_RESOURCE, { resourceId, userTgId: ctx.from?.id });
    }
    async onFreeServerClick(ctx) {
        if (!(await this.botHelpers.assertUserExists(ctx)))
            return;
        const resourceId = this.botHelpers.getResourceId(ctx);
        ctx.scene.enter(bot_types_1.SCENES.FREE_RESOURCE, { resourceId, userTgId: ctx.from?.id });
    }
    async onDisabledServerClick(ctx) {
        if (!(await this.botHelpers.assertUserExists(ctx)))
            return;
        const resourceId = this.botHelpers.getResourceId(ctx);
        if (!resourceId) {
            return ctx.reply('🤔 Не найден ресурс');
        }
        const resource = await this.resourceService.getResource(resourceId);
        const TOMSK_UTC_OFFSET = 7;
        resource?.updatedAt.setHours(resource?.updatedAt.getHours() + TOMSK_UTC_OFFSET);
        ctx.reply(`url: ${resource?.url}\nЗанят: @${resource?.tgUser?.name}\nДата: ${resource?.updatedAt}`);
    }
};
exports.BotUpdate = BotUpdate;
__decorate([
    (0, nestjs_telegraf_1.Command)(bot_types_1.COMMANDS.START),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onStart", null);
__decorate([
    (0, nestjs_telegraf_1.Command)(bot_types_1.COMMANDS.HELP),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onHelp", null);
__decorate([
    (0, nestjs_telegraf_1.Command)(bot_types_1.COMMANDS.LIST),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onList", null);
__decorate([
    (0, nestjs_telegraf_1.Command)(bot_types_1.COMMANDS.CHECK_ID),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onCheckId", null);
__decorate([
    (0, nestjs_telegraf_1.Command)(bot_types_1.COMMANDS.BUSY_LIST),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onBusyList", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(bot_types_1.ACTIONS.TAKE),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onTakeServerClick", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(bot_types_1.ACTIONS.FREE),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onFreeServerClick", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(bot_types_1.ACTIONS.DISABLED),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onDisabledServerClick", null);
exports.BotUpdate = BotUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __metadata("design:paramtypes", [resource_service_1.ResourceService,
        bot_helpers_1.BotHelpers])
], BotUpdate);
//# sourceMappingURL=bot.update.js.map
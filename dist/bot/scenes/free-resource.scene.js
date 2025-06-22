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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeResource = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const bot_types_1 = require("../bot.types");
const resource_service_1 = require("../../resource/resource.service");
const telegraf_1 = require("telegraf");
let FreeResource = class FreeResource {
    resourceService;
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async onSceneEnter(ctx) {
        try {
            const { resourceId, userTgId } = ctx.scene.state;
            const resource = await this.resourceService.getResource(resourceId);
            if (!resource) {
                await ctx.reply('Ресурс не найден 🤔');
                await ctx.scene.leave();
                return;
            }
            const isResourceBusyByMe = resource.tgUser?.tgId === userTgId && !resource.isFree;
            if (!isResourceBusyByMe) {
                throw new Error('Ресурс уже свободен или занят другим 😬');
            }
            let text = `Ты планируешь освободить ${resource.url}\nОписание: ${resource.description}\nПредупреждение: ${resource.endMessage?.text}`;
            const buttons = [
                telegraf_1.Markup.button.callback('Продолжить', bot_types_1.ACTIONS.FREE_ONE),
                telegraf_1.Markup.button.callback('Отмена', bot_types_1.ACTIONS.LEAVE),
            ];
            await ctx.reply(text, telegraf_1.Markup.inlineKeyboard(buttons));
        }
        catch (e) {
            await ctx.reply(`Что-то пошло не так 😬 ${e.message}`);
            await ctx.scene.leave();
        }
    }
    async onFreeCommand(ctx) {
        try {
            const { resourceId, userTgId } = ctx.scene.state;
            await this.resourceService.freeResource(resourceId, userTgId);
            const resource = await this.resourceService.getResource(resourceId);
            if (resource?.isFree) {
                await ctx.reply(`Ресурс ${resource.url} освобожден 🧑‍💻`);
            }
            await ctx.scene.leave();
        }
        catch (e) {
            await ctx.reply(`Что-то пошло не так 😬 ${e.message}`);
            await ctx.scene.leave();
        }
    }
    async onLeaveCommand(ctx) {
        await ctx.reply('Пока 🖖');
        await ctx.scene.leave();
    }
};
exports.FreeResource = FreeResource;
__decorate([
    (0, nestjs_telegraf_1.SceneEnter)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreeResource.prototype, "onSceneEnter", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(bot_types_1.ACTIONS.FREE_ONE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreeResource.prototype, "onFreeCommand", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(bot_types_1.ACTIONS.LEAVE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FreeResource.prototype, "onLeaveCommand", null);
exports.FreeResource = FreeResource = __decorate([
    (0, nestjs_telegraf_1.Scene)(bot_types_1.SCENES.FREE_RESOURCE),
    __metadata("design:paramtypes", [resource_service_1.ResourceService])
], FreeResource);
//# sourceMappingURL=free-resource.scene.js.map
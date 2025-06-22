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
exports.TakeResource = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const bot_types_1 = require("../bot.types");
const resource_service_1 = require("../../resource/resource.service");
const telegraf_1 = require("telegraf");
let TakeResource = class TakeResource {
    resourceService;
    constructor(resourceService) {
        this.resourceService = resourceService;
    }
    async onSceneEnter(ctx) {
        try {
            const resource = await this.resourceService.getResource(ctx.scene.state.resourceId);
            if (!resource) {
                await ctx.reply('Ресурс не найден 🤔');
                await ctx.scene.leave();
                return;
            }
            let text = `Ты планируешь занять ${resource.url}\nОписание: ${resource.description}`;
            if (resource?.tgUser) {
                text += `\n Последним тут был: @${resource.tgUser.name}`;
            }
            const buttons = [
                telegraf_1.Markup.button.callback('Принято', bot_types_1.ACTIONS.TAKE_ONE),
                telegraf_1.Markup.button.callback('Отмена', bot_types_1.ACTIONS.LEAVE),
            ];
            await ctx.reply(text, telegraf_1.Markup.inlineKeyboard(buttons));
        }
        catch (e) {
            return e.message;
        }
    }
    async onTakeCommand(ctx) {
        try {
            const { resourceId, userTgId } = ctx.scene.state;
            const resourceToPeek = await this.resourceService.getResource(resourceId);
            if (resourceToPeek?.isFree) {
                this.resourceService.takeResource(resourceId, userTgId);
                await ctx.reply('Работаем 🧑‍💻');
            }
            else {
                await ctx.reply(`🤔 @${resourceToPeek?.tgUser?.name} уже занял ресурс`);
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
exports.TakeResource = TakeResource;
__decorate([
    (0, nestjs_telegraf_1.SceneEnter)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TakeResource.prototype, "onSceneEnter", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(bot_types_1.ACTIONS.TAKE_ONE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TakeResource.prototype, "onTakeCommand", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(bot_types_1.ACTIONS.LEAVE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TakeResource.prototype, "onLeaveCommand", null);
exports.TakeResource = TakeResource = __decorate([
    (0, nestjs_telegraf_1.Scene)(bot_types_1.SCENES.TAKE_RESOURCE),
    __metadata("design:paramtypes", [resource_service_1.ResourceService])
], TakeResource);
//# sourceMappingURL=take-resource.scene.js.map
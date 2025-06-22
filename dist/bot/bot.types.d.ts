import { SceneContext } from "telegraf/typings/scenes";
export type TContext = {
    match: RegExpMatchArray;
} & SceneContext;
export type TTakeResourceState = {
    resourceId: number;
    userTgId: number;
};
export type TFreeResourceState = {
    resourceId: number;
    userTgId: number;
};
export declare enum SCENES {
    TAKE_RESOURCE = "TAKE_RESOURCE",
    FREE_RESOURCE = "FREE_RESOURCE"
}
export declare enum COMMANDS {
    LIST = "list",
    START = "start",
    CHECK_ID = "check_id",
    BUSY_LIST = "busy_list",
    HELP = "help"
}
export declare const ACTIONS: {
    TAKE: RegExp;
    FREE: RegExp;
    DISABLED: RegExp;
    LEAVE: string;
    TAKE_ONE: string;
    FREE_ONE: string;
};

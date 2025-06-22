
import { SceneContext } from "telegraf/typings/scenes";

export type TContext = {
  match: RegExpMatchArray;
} & SceneContext

export type TTakeResourceState = {
  resourceId: number;
  userTgId: number
}

export type TFreeResourceState = {
  resourceId: number;
  userTgId: number
}

export enum SCENES {
  TAKE_RESOURCE = 'TAKE_RESOURCE',
  FREE_RESOURCE = 'FREE_RESOURCE'
}

export enum COMMANDS {
  LIST = 'list',
  START = 'start',
  CHECK_ID = 'check_id',
  BUSY_LIST = 'busy_list',
  HELP = 'help'
}

export const ACTIONS = {
  TAKE: /take_(\d+)/,
  FREE: /free_(\d+)/,
  DISABLED: /disabled_(\d+)/,
  LEAVE: 'leave',
  TAKE_ONE: 'take',
  FREE_ONE: 'free',
}
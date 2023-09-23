import { IMenuGroup } from './resto/v1/menu-group/menu-group.type';
import { IMenuItemModel } from './resto/v1/menu-item/menu-item.type';
import { IWeekdayWorkingData } from './resto/v1/working-time/working-time.type';

export const enum MODEL_NAME {
  MENU_ITEM = 'menu-item',
  MENU_GROUP = 'menu-group',
  WORKING_TIME = 'working-time',
}

export type MODEL = IMenuGroup | IMenuItemModel | IWeekdayWorkingData;

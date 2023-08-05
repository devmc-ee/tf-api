import { IMenuGroup } from './resto/v1/menu-group/menu-group.type';
import { IMenuItemModel } from './resto/v1/menu-item/menu-item.type';

export const enum MODEL_NAME {
  MENU_ITEM = 'menu-item',
  MENU_GROUP = 'menu-group',
}

export type MODEL = IMenuGroup | IMenuItemModel;

import { IMenuGroupResponse } from '../menu-group/menu-group.type';
import { IMenuItemResponse } from '../menu-item/menu-item.type';

export interface IMenuResponse extends IMenuGroupResponse {
  items: IMenuItemResponse[];
}

import { ObjectId } from 'mongoose';
export interface IMenuIteBase {
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: string;
  code: string;
}

export interface IMenuItemModel extends IMenuIteBase {
  groupId: ObjectId;
}

export interface IMenuItemResponse extends IMenuIteBase {
  groupId: string;
}

export interface IMenuItemRequest extends IMenuIteBase {
  groupId: string;
}

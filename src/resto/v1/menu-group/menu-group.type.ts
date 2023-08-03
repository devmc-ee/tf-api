import { ObjectId } from 'mongoose';

export interface IMenuGroupResponse {
  id: string;
  name: string;
  description: string;
}

export interface IMenuGroup {
  _id: ObjectId;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

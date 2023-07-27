import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './entities/menu.schema';
import { Model } from 'mongoose';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private readonly menuModel: Model<Menu>,
  ) {}
  findAll(): Promise<Menu[]> {
    return this.menuModel.find().exec();
  }
}

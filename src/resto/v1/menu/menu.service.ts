import { Injectable } from '@nestjs/common';
import * as menu from './assets/menu.json';

@Injectable()
export class MenuService {
  findAll() {
    return menu;
  }
}

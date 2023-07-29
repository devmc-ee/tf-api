import { PartialType } from '@nestjs/mapped-types';
import { MenuItemCreateDto } from './create.dto';

export class UpdateMenuItemDto extends PartialType(MenuItemCreateDto) {
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: number;
  code: string;
  groupId: string;

}

import { PartialType } from '@nestjs/mapped-types';
import { MenuItemCreateDto } from './create.dto';

export class UpdateMenuItemDto extends PartialType(MenuItemCreateDto) {
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: string;
  code: string;
  groupId: string;
}

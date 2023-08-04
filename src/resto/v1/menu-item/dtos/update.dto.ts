import { PartialType } from '@nestjs/swagger';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class UpdateMenuItemDto extends PartialType(CreateMenuItemDto) {
  name: string;
  description: string;
  hidden: boolean;
  soldOut: boolean;
  price: string;
  code: string;
  groupId: string;
}

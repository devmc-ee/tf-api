import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsBoolean,
} from 'class-validator';
import { IMenuItem } from '../menu-item.type';

export class MenuItemCreateDto implements IMenuItem {
  @IsBoolean()
  hidden: boolean;

  @IsBoolean()
  soldOut: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;
}

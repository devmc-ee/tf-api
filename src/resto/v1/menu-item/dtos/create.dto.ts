import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { IMenuItemRequest } from '../menu-item.type';
import { Type } from 'class-transformer';

export class MenuItemCreateDto implements IMenuItemRequest {
  @IsBoolean()
  hidden: boolean;

  @IsBoolean()
  soldOut: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  groupId: string;
}

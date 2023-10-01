import {
  IsNotEmpty,
  IsPositive,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { IMenuItemRequest } from '../menu-item.type';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuItemDto implements IMenuItemRequest {
  @ApiProperty()
  @IsBoolean()
  hidden: boolean;

  @ApiProperty()
  @IsBoolean()
  soldOut: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsString()
  groupId: string;

  @ApiProperty()
  @IsString()
  image: string;
}

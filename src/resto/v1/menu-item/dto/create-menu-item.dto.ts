import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsBoolean()
  hidden: boolean;

  @IsBoolean()
  soldOut: boolean;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
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

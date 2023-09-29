import { ApiProperty } from '@nestjs/swagger';
import { IWorkingTimeBase } from '../working-time.type';
import {
  IsBoolean,
  IsString,
  IsNotEmpty,
  ValidateIf,
  Contains,
} from 'class-validator';

export class UpdateWorkingTimeDto implements IWorkingTimeBase {
  @ApiProperty()
  @IsBoolean()
  isOpen: boolean;
  @ApiProperty()
  @ValidateIf((o) => o.isOpen)
  @IsString()
  @IsNotEmpty()
  @Contains(':')
  start: string;
  @ApiProperty()
  @ValidateIf((o) => o.isOpen)
  @IsString()
  @IsNotEmpty()
  @Contains(':')
  end: string;
  @ApiProperty()
  @IsString()
  comment: string;
}

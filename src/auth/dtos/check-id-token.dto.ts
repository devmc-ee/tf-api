import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckIdTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  idToken: string;
}

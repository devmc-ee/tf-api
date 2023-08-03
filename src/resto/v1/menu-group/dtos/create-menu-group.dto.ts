import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMenuGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;
}

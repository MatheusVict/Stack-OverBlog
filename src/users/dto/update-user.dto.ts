import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @ApiPropertyOptional()
  password: string;

  @IsOptional()
  @ApiPropertyOptional()
  picture: string;
}

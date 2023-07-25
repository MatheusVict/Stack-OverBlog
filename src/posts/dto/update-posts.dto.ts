import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePostsDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;

  @IsOptional()
  @ApiPropertyOptional()
  slug: string;
}

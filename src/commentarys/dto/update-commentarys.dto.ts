import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentaryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentaryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
}

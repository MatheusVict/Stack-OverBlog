import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentaryDTO {
  @IsNotEmpty()
  @IsString()
  content: string;
}

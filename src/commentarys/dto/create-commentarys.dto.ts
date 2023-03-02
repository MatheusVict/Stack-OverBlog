import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentaryDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class createCommentaryDTO {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

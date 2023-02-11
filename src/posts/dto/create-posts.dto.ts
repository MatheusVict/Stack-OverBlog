import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostsDTO {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  idUser: string;
}

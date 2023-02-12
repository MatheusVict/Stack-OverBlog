import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostsDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  idUser: string;
}

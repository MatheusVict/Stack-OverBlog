import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePostsDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  slug: string;
}

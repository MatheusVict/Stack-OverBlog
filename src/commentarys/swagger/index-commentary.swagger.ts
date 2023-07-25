import { ApiProperty } from '@nestjs/swagger';
import { IndexUserSwagger } from 'src/users/swagger/index-user.swagger';

export class IndexCommentarySwagger {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  idPost: IndexUserSwagger;

  @ApiProperty()
  content: string;

  @ApiProperty()
  likes: [];
}

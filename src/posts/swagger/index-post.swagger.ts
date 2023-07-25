import { ApiProperty } from '@nestjs/swagger';
import { IndexUserSwagger } from 'src/users/swagger/index-user.swagger';

export class IndexPostSwagger {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  idUser: IndexUserSwagger;
}

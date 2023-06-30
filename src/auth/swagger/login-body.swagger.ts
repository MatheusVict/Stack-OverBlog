import { ApiProperty } from '@nestjs/swagger';

export class BodyLogin {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

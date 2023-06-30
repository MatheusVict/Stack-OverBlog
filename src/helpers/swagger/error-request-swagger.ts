import { ApiProperty } from '@nestjs/swagger';

export class CustomError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}

export class ErrorRequestSwagger {
  @ApiProperty()
  path: string;

  @ApiProperty()
  error: CustomError;
}

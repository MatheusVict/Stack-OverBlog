import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDTO } from './dto/user-create.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { CreateSwagger } from './swagger/create-user.swagger';
import { ErrorRequestSwagger } from 'src/helpers/swagger/error-request-swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: CreateSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  async create(@Body() user: UserCreateDTO) {
    return await this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 200,
    description: 'Return user',
    type: IndexUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorRequestSwagger,
  })
  async findAll(@Query('userId') userId: string) {
    if (!userId) return await this.usersService.getAll();

    return await this.usersService.getOneForId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorRequestSwagger,
  })
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    await this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorRequestSwagger,
  })
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }
}

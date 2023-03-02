import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() user: UserCreateDTO) {
    return await this.usersService.createUser(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query('userId') userId: string) {
    if (!userId) return await this.usersService.getAll();

    return await this.usersService.getOneForId(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
    await this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.deleteUser(id);
  }
}

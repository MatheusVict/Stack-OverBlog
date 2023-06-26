import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import { UserCreateDTO } from './dto/user-create.dto';
import { hashSync } from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async createUser(user: UserCreateDTO): Promise<User> {
    try {
      user.password = hashSync(user.password, 10);
      const userCreated = new this.usersModel(user);
      return await userCreated.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.usersModel.find().select('-password');
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getOneForId(id: string): Promise<Partial<User>> {
    try {
      const userFind = await this.usersModel.findById(id).select('-password');

      if (!userFind) throw new NotFoundException('User not found');

      return userFind;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getUserByEmail(email: string) {
    try {
      return this.usersModel.findOne({ email });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, user: UpdateUserDTO): Promise<void> {
    try {
      const userFind = await this.usersModel.findById(id);

      if (!userFind) throw new NotFoundException('User Not Found');

      if (user.password) {
        user.password = hashSync(user.password, 10);
      }

      await this.usersModel.findOneAndUpdate({ _id: id }, { $set: user });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const userFind = await this.usersModel.findById(id);

      if (!userFind) throw new NotFoundException('User Not Found');

      await this.usersModel.deleteOne({ _id: id });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}

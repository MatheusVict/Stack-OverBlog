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
import { IUserService } from './interfaces/IUserService.interface';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<User>,
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async createUser(userDTO: UserCreateDTO): Promise<User> {
    try {
      const hashedPassword = this.hashPassword(userDTO.password);
      const userCreated = new this.usersModel({
        ...userDTO,
        password: hashedPassword,
      });
      return await userCreated.save();
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      return await this.usersModel.find().select('-password').exec();
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getOneForId(id: string): Promise<Partial<User>> {
    try {
      const userFind = await this.usersModel.findById(id).select('-password');

      if (!userFind) throw new NotFoundException('User not found');

      return userFind;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.usersModel.findOne({ email });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, user: UpdateUserDTO): Promise<void> {
    try {
      const userFind = await this.usersModel.findById(id);

      if (!userFind) throw new NotFoundException('User Not Found');

      if (user.password) {
        user.password = this.hashPassword(user.password);
      }

      await this.usersModel.findOneAndUpdate({ _id: id }, { $set: user });
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      const userFind = await this.usersModel.findById(id);

      if (!userFind) throw new NotFoundException('User Not Found');

      await this.usersModel.deleteOne({ _id: id });
    } catch (error) {
      this.handleError(error);
    }
  }

  private hashPassword(password: string): string {
    return hashSync(password, 10);
  }

  private handleError(error: any): void {
    this.logger.error(error.message);
    throw new BadRequestException(error.message);
  }
}

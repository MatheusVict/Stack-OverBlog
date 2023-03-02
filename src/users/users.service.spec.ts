import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let userService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('users'),
          useValue: {},
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('users'));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userModel).toBeDefined();
  });
});

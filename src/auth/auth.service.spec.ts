import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/schemas/users.schemas';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let usersModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          privateKey: process.env.JWT_PRIVATE_KEY,
          signOptions: { expiresIn: `${process.env.JWT_EXPIRES_TIME}s` },
        }),
      ],
      providers: [
        AuthService,
        UsersService,
        {
          provide: getModelToken('users'),
          useValue: Model,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    usersModel = module.get<Model<User>>(getModelToken('users'));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersService).toBeDefined();
    expect(usersModel).toBeDefined();
  });
});

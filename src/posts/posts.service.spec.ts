import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Model } from 'mongoose';
import { Posts } from './schemas/posts.schema';
import { UsersService } from 'src/users/users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/users.schemas';

describe('PostsService', () => {
  let service: PostsService;
  let postsModel: Model<Posts>;
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken('posts'),
          useValue: Model,
        },
        UsersService,
        {
          provide: getModelToken('users'),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postsModel = module.get<Model<Posts>>(getModelToken('posts'));
    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('users'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

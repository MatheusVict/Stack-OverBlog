import { Test, TestingModule } from '@nestjs/testing';
import { CommentarysService } from './commentarys.service';
import { Commentarys } from './schemas/commentarys.schemas';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Posts } from 'src/posts/schemas/posts.schema';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemas/users.schemas';

describe('CommentarysService', () => {
  let commentarysService: CommentarysService;
  let commentarysModel: Model<Commentarys>;
  let postsService: PostsService;
  let postsModel: Model<Posts>;
  let usersService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentarysService,
        {
          provide: getModelToken('commentarys'),
          useValue: {},
        },
        PostsService,
        {
          provide: getModelToken('posts'),
          useValue: {},
        },
        UsersService,
        {
          provide: getModelToken('users'),
          useValue: {},
        },
      ],
    }).compile();

    commentarysService = module.get<CommentarysService>(CommentarysService);
    commentarysModel = module.get<Model<Commentarys>>(
      getModelToken('commentarys'),
    );
    postsService = module.get<PostsService>(PostsService);
    postsModel = module.get<Model<Posts>>(getModelToken('posts'));
    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('users'));
  });

  it('should be defined', () => {
    expect(commentarysService).toBeDefined();
    expect(commentarysModel).toBeDefined();
    expect(postsService).toBeDefined();
    expect(postsModel).toBeDefined();
    expect(usersService).toBeDefined();
    expect(userModel).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import { getModelToken } from '@nestjs/mongoose';
import { UserCreateDTO } from './dto/user-create.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

const UserModelList: User[] = [
  new User({
    name: 'Matheus',
    email: 'math@gmail.com',
    password: 'lasndaldna',
    isAdm: 1,
  }),
  new User({
    name: 'nat',
    email: 'math@gmail.com',
    password: 'lasndaldna',
    isAdm: 1,
  }),
  new User({
    name: 'nat',
    email: 'math@gmail.com',
    password: 'lasndaldna',
    isAdm: 1,
  }),
];

describe('UsersService', () => {
  let userService: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('users'),
          useValue: {
            save: jest.fn().mockResolvedValue(UserModelList[0]),
            find: jest.fn().mockResolvedValue(UserModelList),
            findById: jest.fn().mockResolvedValue(UserModelList[0]),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn().mockResolvedValue(UserModelList[0]),
            deleteOne: jest.fn(),
          },
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

  describe('getAll', () => {
    it('should return a user model array', async () => {
      const result = await userService.getAll();

      expect(result).toEqual(UserModelList);
      expect(userModel.find).toHaveBeenCalledTimes(1);
    });

    it('should throw execption', () => {
      jest.spyOn(userModel, 'find').mockRejectedValueOnce(new Error());

      expect(userService.getAll()).rejects.toThrowError();
    });
  });

  describe('getOneById', () => {
    it('should return a user Entity item successfuly', async () => {
      const result = await userService.getOneForId('1');

      expect(result).toEqual(UserModelList[0]);
      expect(userModel.findById).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotfoundExecption', () => {
      jest.spyOn(userModel, 'findById').mockRejectedValueOnce(new Error());

      expect(userService.getOneForId).rejects.toThrowError();
    });
  });

  describe('createUser', () => {
    it('should create a new user successfuly', async () => {
      const data: UserCreateDTO = {
        email: 'math@gmail.com',
        name: 'Matheus',
        password: 'lasndaldna',
      };
    });
  });

  describe('update', () => {
    it('should update a user successfuly', async () => {
      const data: UpdateUserDTO = {
        name: 'mat',
        password: '25353131',
      };

      jest.spyOn(userModel, 'findOneAndUpdate').mockRejectedValueOnce(data);

      const result = await userService.update('id', data);

      expect(result).toEqual(data);
    });
  });
});

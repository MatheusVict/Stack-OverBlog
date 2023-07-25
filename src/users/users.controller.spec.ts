import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/users.schemas';
import { UserCreateDTO } from './dto/user-create.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

const userMockedList: User[] = [
  new User({
    name: 'Test',
    email: 'example@emil.com',
    password: '123456',
    isAdm: 1,
    picture: 'picture',
  }),
  new User({
    name: 'Test',
    email: 'example@emil.com',
    password: '123456',
    isAdm: 1,
    picture: 'picture',
  }),
  new User({
    name: 'Test',
    email: 'example@emil.com',
    password: '123456',
    isAdm: 1,
    picture: 'picture',
  }),
];

const newUser = new User({
  name: 'Test',
  email: 'exmple@email.com',
  password: 'Admin123@',
  picture: 'picture',
});

const updatedUser = new User({
  name: 'Test 1',
  email: 'exmple@email.com',
  password: 'Admin1234@',
  picture: 'picture1',
});

describe('UsersController', () => {
  let userscontroller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(newUser),
            getAll: jest.fn().mockResolvedValue(userMockedList),
            getOneForId: jest.fn().mockResolvedValue(userMockedList[0]),
            update: jest.fn().mockResolvedValue(updatedUser),
            deleteUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userscontroller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userscontroller).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const result = await userscontroller.findAll();

      expect(result).toEqual(userMockedList);
      expect(typeof result).toEqual('object');
      expect(usersService.getAll).toHaveBeenCalledTimes(1);
      expect(result[0].email).toEqual(userMockedList[0].email);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(usersService, 'getAll')
        .mockRejectedValueOnce(new Error('Internal Error Server'));

      expect(userscontroller.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: UserCreateDTO = {
        name: 'Test',
        email: 'exmple@email.com',
        password: 'Admin123@',
        picture: 'picture',
      };

      const result = await userscontroller.create(user);

      expect(result).toEqual(newUser);
      expect(typeof result).toEqual('object');
      expect(usersService.createUser).toHaveBeenCalledTimes(1);
      expect(usersService.createUser).toHaveBeenCalledWith(user);
      expect(result.email).toEqual(newUser.email);
    });

    it('should throw an exception', () => {
      const user: UserCreateDTO = {
        name: 'Test',
        email: 'exmple@email.com',
        password: 'Admin123@',
        picture: 'picture',
      };

      jest
        .spyOn(usersService, 'createUser')
        .mockRejectedValueOnce(new Error('Internal Error Server'));

      expect(userscontroller.create(user)).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await userscontroller.findOne('1');

      expect(result).toEqual(userMockedList[0]);
      expect(typeof result).toEqual('object');
      expect(usersService.getOneForId).toHaveBeenCalledTimes(1);
      expect(usersService.getOneForId).toHaveBeenCalledWith('1');
      expect(result.email).toEqual(userMockedList[0].email);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(usersService, 'getOneForId')
        .mockRejectedValueOnce(new Error('Internal Error Server'));

      expect(userscontroller.findOne('1')).rejects.toThrowError();
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user: UpdateUserDTO = {
        name: 'Test',
        password: 'Admin123@',
        picture: 'picture',
      };

      const result = await usersService.update('1', user);

      expect(result).toEqual(updatedUser);
      expect(typeof result).toEqual('object');
      expect(usersService.update).toHaveBeenCalledTimes(1);
      expect(usersService.update).toHaveBeenCalledWith('1', user);
    });

    it('should throw an exception', () => {
      const user: UpdateUserDTO = {
        name: 'Test',
        password: 'Admin123@',
        picture: 'picture',
      };

      jest.spyOn(usersService, 'update').mockRejectedValueOnce(new Error());

      expect(userscontroller.updateUser('1', user)).rejects.toThrowError();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const result = await userscontroller.deleteUser('1');

      expect(result).toBeUndefined();
      expect(usersService.deleteUser).toHaveBeenCalledTimes(1);
      expect(usersService.deleteUser).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      jest
        .spyOn(usersService, 'deleteUser')
        .mockRejectedValueOnce(new Error('Internal Error Server'));

      expect(userscontroller.deleteUser('1')).rejects.toThrowError();
    });
  });
});

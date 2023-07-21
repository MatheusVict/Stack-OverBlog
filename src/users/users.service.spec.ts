import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schemas/users.schemas';
import { getModelToken } from '@nestjs/mongoose';

const newUser = new User({
  name: 'Test',
  email: 'test@example.com',
  password: 'password123',
  picture: 'picture-url',
});

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('users'),
          useValue: {
            find: jest.fn(),
            save: jest.fn().mockResolvedValue(newUser),
            findById: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<User>>(getModelToken('users'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userModel).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const usersWithPasswords: User[] = [
        new User({
          name: 'User 1',
          email: 'user1@example.com',
          password: 'password1',
          isAdm: 0,
          picture: 'picture-url-1',
        }),
        new User({
          name: 'User 2',
          email: 'user2@example.com',
          password: 'password2',
          isAdm: 1,
          picture: 'picture-url-2',
        }),
      ];

      const usersWithoutPasswords: Partial<User>[] = usersWithPasswords.map(
        (user) => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        },
      );

      jest.spyOn(userModel, 'find').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValueOnce(usersWithoutPasswords),
      } as any);

      const result = await service.getAll();

      expect(result).toEqual(usersWithoutPasswords);
      expect(userModel.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the database operation fails', async () => {
      const errorMessage = 'Database query error';

      jest.spyOn(userModel, 'find').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
      } as any);

      try {
        await service.getAll();
      } catch (error) {
        expect(error.message).toEqual(errorMessage);
        expect(error instanceof Error).toBe(true);
        expect(service.getAll()).rejects.toThrowError();
      }
    });
  });

  describe('getOneForId', () => {
    it('should get one user by Id', async () => {
      const userMockedList: User[] = [
        new User({
          name: 'Test1',
          email: 'example@emil.com',
          password: '123456',
          isAdm: 1,
          picture: 'picture',
        }),
        new User({
          name: 'Test2',
          email: 'example@emil.com',
          password: '123456',
          isAdm: 1,
          picture: 'picture',
        }),
        new User({
          name: 'Test3',
          email: 'example@emil.com',
          password: '123456',
          isAdm: 1,
          picture: 'picture',
        }),
      ];

      jest.spyOn(userModel, 'findById').mockReturnValueOnce({
        select: jest.fn().mockResolvedValueOnce(userMockedList[0]),
        exec: jest.fn().mockResolvedValueOnce(userMockedList[0]),
      } as any);

      const result = await service.getOneForId('1');

      expect(result).toEqual(userMockedList[0]);
      expect(result.name).toEqual('Test1');
      expect(userModel.findById).toHaveBeenCalledTimes(1);
      expect(userModel.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if the database operation fails', async () => {
      jest.spyOn(userModel, 'findById').mockReturnValueOnce({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValueOnce(new Error()),
      } as any);

      try {
        await service.getOneForId('1');
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        expect(service.getOneForId('1')).rejects.toThrowError();
      }
    });
  });

  describe('getUserByEmail', () => {
    it('should get one user by email', async () => {
      const userMockedList: User[] = [
        new User({
          name: 'Test1',
          email: 'example@emil1.com',
          password: '123456',
          isAdm: 1,
          picture: 'picture',
        }),
        new User({
          name: 'Test2',
          email: 'example@emil2.com',
          password: '123456',
          isAdm: 1,
          picture: 'picture',
        }),
        new User({
          name: 'Test3',
          email: 'example@emil3.com',
          password: '123456',
          isAdm: 1,
          picture: 'picture',
        }),
      ];

      jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(userMockedList[0]);

      const result = await service.getUserByEmail('example@emil1.com');

      expect(result).toEqual(userMockedList[0]);
      expect(result.email).toEqual('example@emil1.com');
      expect(userModel.findOne).toHaveBeenCalledTimes(1);
      expect(userModel.findOne).toHaveBeenCalledWith({
        email: 'example@emil1.com',
      });
    });

    it('should throw an error if the database operation fails', async () => {
      jest.spyOn(userModel, 'findOne').mockRejectedValueOnce(new Error());

      try {
        await service.getUserByEmail('1');
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        expect(service.getUserByEmail('1')).rejects.toThrowError();
      }
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userMoked = new User({
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        isAdm: 1,
        picture: 'picture-url-1',
      });

      const userToUpdate = new User({
        name: 'User 2',
        email: 'user2@example.com',
        password: 'password2',
        isAdm: 0,
        picture: 'picture-url-2',
      });

      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(userMoked);
      jest
        .spyOn(userModel, 'findOneAndUpdate')
        .mockResolvedValueOnce(userMoked);

      await service.update('1', userToUpdate);

      expect(userModel.findById).toHaveBeenCalledTimes(1);
      expect(userModel.findById).toHaveBeenCalledWith('1');
      expect(userModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(userModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: '1' },
        { $set: userToUpdate },
      );
    });

    it('should throw an error in findById if the database operation fails', async () => {
      jest.spyOn(userModel, 'findById').mockRejectedValueOnce(new Error());

      try {
        await service.update('1', newUser);
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        expect(service.update('1', newUser)).rejects.toThrowError();
      }
    });

    it('should throw an error in findOneAndUpdate if the database operation fails', async () => {
      jest
        .spyOn(userModel, 'findOneAndUpdate')
        .mockRejectedValueOnce(new Error());

      try {
        await service.update('1', newUser);
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        expect(service.update('1', newUser)).rejects.toThrowError();
      }
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userMoked = new User({
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
        isAdm: 1,
        picture: 'picture-url-1',
      });

      jest.spyOn(userModel, 'deleteOne').mockResolvedValueOnce(undefined);
      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(userMoked);

      const result = await service.deleteUser('1');

      expect(userModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(userModel.deleteOne).toHaveBeenCalledWith({ _id: '1' });
      expect(result).toBeUndefined();
    });

    it('should throw an error in findById if the database operation fails', async () => {
      jest.spyOn(userModel, 'findById').mockRejectedValueOnce(new Error());

      try {
        await service.deleteUser('1');
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        expect(service.deleteUser('1')).rejects.toThrowError();
      }
    });

    it('should throw an error in deleteOne if the database operation fails', async () => {
      jest.spyOn(userModel, 'deleteOne').mockRejectedValueOnce(new Error());

      try {
        await service.deleteUser('1');
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        expect(service.deleteUser('1')).rejects.toThrowError();
      }
    });
  });
});

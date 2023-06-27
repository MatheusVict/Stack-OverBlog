import { UpdateUserDTO } from '../dto/update-user.dto';
import { UserCreateDTO } from '../dto/user-create.dto';
import { User } from '../schemas/users.schemas';

export interface IUserService {
  createUser(user: UserCreateDTO): Promise<User>;
  getAll(): Promise<User[]>;
  getOneForId(id: string): Promise<Partial<User>>;
  getUserByEmail(email: string): Promise<User>;
  update(id: string, user: UpdateUserDTO): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

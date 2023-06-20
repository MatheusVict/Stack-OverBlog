import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemas/users.schemas';
import { OAuthCredentials } from './interfaces/OAuthCredentials.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(user: Partial<User>) {
    const payload = { id: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async loginWithGoogle(credentials: OAuthCredentials) {
    try {
      const userExists = await this.usersService.getUserByEmail(
        credentials.email,
      );

      if (!userExists) {
        const createdUser = await this.usersService.createUser({
          email: credentials.email,
          name: credentials.name,
          password: 'oauth-password',
        });

        return createdUser;
      } else {
        return userExists;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateUser(email: string, password: string) {
    let user: User;

    try {
      user = await this.usersService.getUserByEmail(email);
    } catch (error) {
      return null;
    }
    const isPassworValid = compareSync(password, user.password);

    if (!isPassworValid) return null;

    return user;
  }
}

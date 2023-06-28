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
      id: user.id,
      token: this.jwtService.sign(payload),
      name: user.name,
      email: user.email,
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
          picture: credentials.picture,
        });
        const payload = { id: createdUser.id, email: createdUser.email };

        return {
          id: createdUser.id,
          token: this.jwtService.sign(payload),
          name: createdUser.name,
          email: createdUser.email,
        };
      } else {
        const payload = { id: userExists.id, email: userExists.email };

        return {
          id: userExists.id,
          token: this.jwtService.sign(payload),
          name: userExists.name,
          email: userExists.email,
        };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async loginWithGitHub(credentials: OAuthCredentials) {
    try {
      const userExists = await this.usersService.getUserByEmail(
        credentials.email,
      );

      if (!userExists) {
        const createdUser = await this.usersService.createUser({
          email: credentials.email,
          name: credentials.name,
          password: 'oauth-password',
          picture: credentials.picture,
        });
        const payload = { id: createdUser.id, email: createdUser.email };

        return {
          id: createdUser.id,
          token: this.jwtService.sign(payload),
          name: createdUser.name,
          email: createdUser.email,
        };
      } else {
        const payload = { id: userExists.id, email: userExists.email };

        return {
          id: userExists.id,
          token: this.jwtService.sign(payload),
          name: userExists.name,
          email: userExists.email,
        };
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

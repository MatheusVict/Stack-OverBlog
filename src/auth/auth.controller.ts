import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { OAuth2Client } from 'google-auth-library';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { Octokit } from '@octokit/core';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('login/google')
  async loginWithGoogle(@Body('id_token') token) {
    console.log(JSON.stringify(token));
    try {
      const client = new OAuth2Client({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      });

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = await ticket.getPayload();

      return await this.authService.loginWithGoogle({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  @Post('login/github')
  async loginWithGitHub(@Body('access_token') token: any) {
    console.log(JSON.stringify(token));
    try {
      const octokit = new Octokit({
        auth: token,
      });

      const { data } = await octokit.request('GET /user');

      console.log('Usuário autenticado:', JSON.stringify(data));
    } catch (error) {
      throw new UnauthorizedException('Invalid access token' + error);
    }
  }
}

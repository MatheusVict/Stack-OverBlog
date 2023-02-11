import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './schemas/posts.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts')
    private readonly postsModel: Model<Posts>,
  ) {}
}

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './schemas/posts.schema';
import { CreatePostsDTO } from './dto/create-posts.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts')
    private readonly postsModel: Model<Posts>,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(PostsService.name);

  async createPost(data: CreatePostsDTO): Promise<void> {
    try {
      const user = await this.usersService.getOneForId(data.idUser);

      //fazer o split do slug

      if (!user) throw new BadRequestException(`User ${data.idUser} not found`);

      const post = new this.postsModel(data);

      await post.save();
    } catch (error) {
      this.logger.log(JSON.stringify(error.message));
      throw new BadRequestException(error.message);
    }
  }
}

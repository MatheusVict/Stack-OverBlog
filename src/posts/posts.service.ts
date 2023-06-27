import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from './schemas/posts.schema';
import { CreatePostsDTO } from './dto/create-posts.dto';
import { UsersService } from 'src/users/users.service';
import { UpdatePostsDTO } from './dto/update-posts.dto';
import { IPostsService } from './interfaces/IPostsService.interface';

@Injectable()
export class PostsService implements IPostsService {
  constructor(
    @InjectModel('posts')
    private readonly postsModel: Model<Posts>,
    private readonly usersService: UsersService,
  ) {}

  private readonly logger = new Logger(PostsService.name);

  async createPost(data: CreatePostsDTO): Promise<void> {
    try {
      const user = await this.usersService.getOneForId(data.idUser);

      if (!user) throw new BadRequestException(`User ${data.idUser} not found`);

      const post = new this.postsModel(data);

      const titleLowerCase = data.title.toLocaleLowerCase();

      const titleSplited = titleLowerCase.split(' ');

      const slug = titleSplited.join('-');

      post.slug = slug;

      await post.save();
    } catch (error) {
      this.logger.log(JSON.stringify(error.message));
      throw new BadRequestException(error.message);
    }
  }

  async getAllPosts() {
    try {
      return await this.postsModel.find().populate('idUser');
    } catch (error) {
      this.logger.log(JSON.stringify(error.message));
      throw new BadRequestException(error.message);
    }
  }

  async getOneForId(id: string) {
    try {
      const post = await this.postsModel.findById(id).populate('idUser');

      if (!post) throw new NotFoundException(`Post ${id} not found`);

      return post;
    } catch (error) {
      this.logger.log(JSON.stringify(error.message));
      throw new BadRequestException(error.message);
    }
  }

  async getOneForSlug(slug: any) {
    try {
      const post = await this.postsModel
        .find()
        .where('slug')
        .in(slug)
        .populate('idUser');

      if (!post) throw new NotFoundException(`Post: ${slug} ot found`);

      return post;
    } catch (error) {
      this.logger.log(JSON.stringify(error.message));
      throw new BadRequestException(error.message);
    }
  }

  async updatePost(_id: string, data: UpdatePostsDTO) {
    try {
      const post = await this.postsModel.findById(_id);

      if (!post) throw new NotFoundException(`Post ${_id} not found`);

      const titleLowerCase = data.title.toLocaleLowerCase();

      const titleSplited = titleLowerCase.split(' ');

      const slug = titleSplited.join('-');

      data.slug = slug;

      await this.postsModel.findOneAndUpdate({ _id }, { $set: data });
    } catch (error) {
      this.logger.log(JSON.stringify(error.message));
      throw new BadRequestException(error.message);
    }
  }

  async deletePost(_id: string) {
    const post = await this.postsModel.findById(_id);

    if (!post) throw new NotFoundException(`Post ${_id} not found`);

    await this.postsModel.deleteOne({ _id });
  }
}

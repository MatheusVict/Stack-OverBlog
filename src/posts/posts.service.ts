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

      post.slug = this.getSlug(post.title);

      await post.save();
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAllPosts() {
    try {
      return await this.postsModel.find().populate('idUser');
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOneForId(id: string) {
    try {
      const post = await this.postsModel.findById(id).populate('idUser');

      if (!post) throw new NotFoundException(`Post ${id} not found`);

      return post;
    } catch (error) {
      this.handleError(error);
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
      this.handleError(error);
    }
  }

  async updatePost(_id: string, data: UpdatePostsDTO) {
    try {
      const post = await this.postsModel.findById(_id);

      if (!post) throw new NotFoundException(`Post ${_id} not found`);

      data.slug = this.getSlug(data.title);

      await this.postsModel.findOneAndUpdate({ _id }, { $set: data });
    } catch (error) {
      this.handleError(error);
    }
  }

  async deletePost(_id: string) {
    const post = await this.postsModel.findById(_id);

    if (!post) throw new NotFoundException(`Post ${_id} not found`);

    await this.postsModel.deleteOne({ _id });
  }

  private getSlug(title: string) {
    const titleLowerCase = title.toLocaleLowerCase();

    const titleSplited = titleLowerCase.split(' ');

    const slug = titleSplited.join('-');

    return slug;
  }

  private handleError(error: any) {
    this.logger.log(JSON.stringify(error.message));
    throw new BadRequestException(error.message);
  }
}

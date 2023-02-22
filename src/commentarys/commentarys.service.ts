import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commentarys } from './schemas/commentarys.schemas';
import { PostsService } from 'src/posts/posts.service';
import { createCommentaryDTO } from './dto/create-commentarys.dto';

@Injectable()
export class CommentarysService {
  constructor(
    @InjectModel('commentarys')
    private readonly commentarysModel: Model<Commentarys>,
    private readonly postsServices: PostsService,
  ) {}

  private readonly logger = new Logger(CommentarysService.name);

  async getAllCommentarysForPost(idPost: any) {
    try {
      const post = await this.postsServices.getOneForId(idPost);

      if (!post) throw new BadRequestException('The post does not exist');

      return await this.commentarysModel.find().where('idPost').in(idPost);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getOneCommentaryForPost(idPost: any, idComment: string) {
    try {
      return await this.commentarysModel
        .findById(idComment)
        .where('idPost')
        .in(idPost);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async createCommentary(idPost: string, body: createCommentaryDTO) {
    try {
      const post = await this.postsServices.getOneForId(idPost);

      if (!post) throw new BadRequestException('Post not found');

      const commentarys = new this.commentarysModel(body);
      commentarys.idPost = idPost;

      await commentarys.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}

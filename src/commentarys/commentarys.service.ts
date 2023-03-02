import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Commentarys } from './schemas/commentarys.schemas';
import { PostsService } from 'src/posts/posts.service';
import { UpdateCommentaryDTO } from './dto/update-commentarys.dto';
import { CreateCommentaryDTO } from './dto/create-commentarys.dto';

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

      return await this.commentarysModel
        .find()
        .where('idPost')
        .in(idPost)
        .populate('userId');
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getOneCommentaryForPost(idPost: any, idComment: string) {
    try {
      const commentary = await this.commentarysModel
        .findById(idComment)
        .where('idPost')
        .in(idPost)
        .populate('userId');
      // populate é o nome do campo no schema

      if (!commentary)
        throw new NotFoundException(`Commentary: ${idComment} not found`);

      return commentary;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async createCommentary(idPost: string, body: CreateCommentaryDTO) {
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

  async updateCommentary(idComment: string, body: UpdateCommentaryDTO) {
    try {
      const commentarys = await this.commentarysModel.findById(idComment);

      if (!commentarys)
        throw new NotFoundException(`the commentary ${idComment} not found`);

      await this.commentarysModel.findOneAndUpdate(
        { _id: idComment },
        { $set: body },
      );
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async deleteCommentary(idComment: string) {
    try {
      const commentary = await this.commentarysModel.findById(idComment);

      if (!commentary)
        throw new NotFoundException(`the commentary ${idComment} not found`);

      await this.commentarysModel.findByIdAndDelete(idComment);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}

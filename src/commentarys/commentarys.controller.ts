import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentarysService } from './commentarys.service';
import { CreateCommentaryDTO } from './dto/create-commentarys.dto';
import { UpdateCommentaryDTO } from './dto/update-commentarys.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('commentarys')
export class CommentarysController {
  constructor(private readonly commentarysServices: CommentarysService) {}

  @Get()
  async getAll(@Query('idPost') idPost: string) {
    return await this.commentarysServices.getAllCommentarysForPost(idPost);
  }

  @Get(':idComment')
  async getCommentForPost(
    @Param('idComment') idComment: string,
    @Query('idPost') idPost: string,
  ) {
    return await this.commentarysServices.getOneCommentaryForPost(
      idPost,
      idComment,
    );
  }

  @Post()
  async createCommentary(
    @Query('idPost') idPost: string,
    @Body() body: CreateCommentaryDTO,
  ) {
    await this.commentarysServices.createCommentary(idPost, body);
  }

  @Patch(':idComment')
  async updateCommentary(
    @Param('idComment') idComment: string,
    @Body() body: UpdateCommentaryDTO,
  ) {
    await this.commentarysServices.updateCommentary(idComment, body);
  }

  @Delete(':idComment')
  async deleteCommentary(@Param('idComment') idComment: string) {
    await this.commentarysServices.deleteCommentary(idComment);
  }
}

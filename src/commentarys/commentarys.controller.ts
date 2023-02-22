import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentarysService } from './commentarys.service';
import { createCommentaryDTO } from './dto/create-commentarys.dto';

@Controller('commentarys')
export class CommentarysController {
  constructor(private readonly commentarysServices: CommentarysService) {}

  @Get()
  async getAll(@Query('idPost') idPost: string) {
    return await this.commentarysServices.getAllCommentarysForPost(idPost);
  }

  @Get(':idComment')
  async getCommentForId(
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
    @Body() body: createCommentaryDTO,
  ) {
    await this.commentarysServices.createCommentary(idPost, body);
  }
}

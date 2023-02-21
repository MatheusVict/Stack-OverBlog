import { Controller, Get, Query } from '@nestjs/common';
import { CommentarysService } from './commentarys.service';

@Controller('commentarys')
export class CommentarysController {
  constructor(private readonly commentarysServices: CommentarysService) {}

  @Get()
  async getAll(@Query('idPost') idPost: string) {
    return await this.commentarysServices.getAllCommentarysForPost(idPost);
  }
}

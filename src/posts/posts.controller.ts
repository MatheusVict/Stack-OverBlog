import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDTO } from './dto/create-posts.dto';
import { UpdatePostsDTO } from './dto/update-posts.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(@Body() data: CreatePostsDTO) {
    await this.postsService.createPost(data);
  }

  @Get()
  async getPosts(
    @Query('IdPost') idPost: string,
    @Query('slugPost') slugPost: string,
  ) {
    if (idPost) return await this.postsService.getOneForId(idPost);

    if (slugPost) return await this.postsService.getOneForSlug(slugPost);

    return await this.postsService.getAllPosts();
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(@Param('id') id: string, @Body() data: UpdatePostsDTO) {
    await this.postsService.updatePost(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePost(@Param('id') id: string) {
    await this.postsService.deletePost(id);
  }
}

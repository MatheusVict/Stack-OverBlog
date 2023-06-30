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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexPostSwagger } from './swagger/index-post.swagger';
import { ErrorRequestSwagger } from 'src/helpers/swagger/error-request-swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorRequestSwagger,
  })
  async createPost(@Body() data: CreatePostsDTO) {
    await this.postsService.createPost(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Return all posts',
    type: IndexPostSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorRequestSwagger,
  })
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
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({
    status: 204,
    description: 'The post has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorRequestSwagger,
  })
  async updatePost(@Param('id') id: string, @Body() data: UpdatePostsDTO) {
    await this.postsService.updatePost(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({
    status: 204,
    description: 'The post has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    type: ErrorRequestSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
    type: ErrorRequestSwagger,
  })
  async deletePost(@Param('id') id: string) {
    await this.postsService.deletePost(id);
  }
}

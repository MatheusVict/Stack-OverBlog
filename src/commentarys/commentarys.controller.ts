import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexCommentarySwagger } from './swagger/index-commentary.swagger';
import { ErrorRequestSwagger } from 'src/helpers/swagger/error-request-swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('commentarys')
@ApiTags('commentarys')
export class CommentarysController {
  constructor(private readonly commentarysServices: CommentarysService) {}

  @Get()
  @ApiOperation({ summary: 'Get all commentarys' })
  @ApiResponse({
    status: 200,
    description: 'Return all commentarys',
    type: IndexCommentarySwagger,
    isArray: true,
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
  async getAll(@Query('idPost') idPost: string) {
    return await this.commentarysServices.getAllCommentarysForPost(idPost);
  }

  @Get(':idComment')
  @ApiOperation({ summary: 'Get one commentary from post' })
  @ApiResponse({
    status: 200,
    description: 'Return one commentary',
    type: IndexCommentarySwagger,
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
  @ApiOperation({ summary: 'Create commentary' })
  @ApiResponse({
    status: 201,
    description: 'The commentary has been successfully created.',
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
  async createCommentary(
    @Query('idPost') idPost: string,
    @Body() body: CreateCommentaryDTO,
  ) {
    await this.commentarysServices.createCommentary(idPost, body);
  }

  @Patch(':idComment')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update commentary' })
  @ApiResponse({
    status: 204,
    description: 'The commentary has been successfully updated.',
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
  async updateCommentary(
    @Param('idComment') idComment: string,
    @Body() body: UpdateCommentaryDTO,
  ) {
    await this.commentarysServices.updateCommentary(idComment, body);
  }

  @Delete(':idComment')
  @ApiOperation({ summary: 'Delete commentary' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: 204,
    description: 'The commentary has been successfully deleted.',
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
  async deleteCommentary(@Param('idComment') idComment: string) {
    await this.commentarysServices.deleteCommentary(idComment);
  }
}

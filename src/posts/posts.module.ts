import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './schemas/posts.schema';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'posts', schema: PostsSchema }]),
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}

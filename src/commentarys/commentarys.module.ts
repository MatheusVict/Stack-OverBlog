import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentarysSchema } from './schemas/commentarys.schemas';
import { CommentarysService } from './commentarys.service';
import { CommentarysController } from './commentarys.controller';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'commentarys', schema: CommentarysSchema },
    ]),
    PostsModule,
  ],
  providers: [CommentarysService],
  controllers: [CommentarysController],
})
export class CommentarysModule {}

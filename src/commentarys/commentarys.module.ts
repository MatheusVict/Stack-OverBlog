import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentarysSchema } from './schemas/commentarys.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'commentarys', schema: CommentarysSchema },
    ]),
  ],
})
export class CommentarysModule {}

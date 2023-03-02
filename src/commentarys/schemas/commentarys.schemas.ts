import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'commentarys' })
export class Commentarys extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'posts' })
  idPost: string;

  @Prop()
  content: string;

  @Prop([])
  likes: [];
}

export const CommentarysSchema = SchemaFactory.createForClass(Commentarys);

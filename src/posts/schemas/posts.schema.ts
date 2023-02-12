import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'posts' })
export class Posts extends mongoose.Document {
  @Prop()
  slug: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  idUser: string;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);

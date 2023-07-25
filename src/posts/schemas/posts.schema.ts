import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'posts' })
export class Posts {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop()
  slug: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  idUser: string;

  get id(): string {
    return this._id.toHexString();
  }

  constructor(posts?: Partial<Posts>) {
    Object.assign(this, posts);
  }
}

export const PostsSchema = SchemaFactory.createForClass(Posts);

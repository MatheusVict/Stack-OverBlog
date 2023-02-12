import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'commentarys' })
export class Commentarys extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  userId: string;

  @Prop()
  content: string;
}

export const CommentarysSchema = SchemaFactory.createForClass(Commentarys);

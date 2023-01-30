import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User extends mongoose.Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }] })
  postsId: string[];

  @Prop()
  isAdm: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

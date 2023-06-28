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

  @Prop()
  isAdm: number;

  @Prop()
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

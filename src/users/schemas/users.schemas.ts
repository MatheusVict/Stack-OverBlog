import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User extends mongoose.Document {
  @Prop()
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  password: string;

  @Prop()
  @ApiProperty()
  isAdm: number;

  @Prop()
  @ApiProperty()
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

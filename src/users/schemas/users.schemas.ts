import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

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

  get id(): string {
    return this._id.toHexString();
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

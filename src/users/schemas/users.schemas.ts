import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isAdm: number;

  constructor(user?: Partial<User>) {
    (this.name = user?.name),
      (this.email = user?.email),
      (this.password = user?.password),
      (this.isAdm = user?.isAdm);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

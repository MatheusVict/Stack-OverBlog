import { OmitType } from '@nestjs/swagger';
import { User } from '../schemas/users.schemas';

export class IndexUserSwagger extends OmitType(User, ['password', 'isAdm']) {}

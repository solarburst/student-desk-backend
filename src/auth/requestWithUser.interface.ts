import { Request } from 'express';
import { UsersEntity } from '../user/entities/users.entity';

export interface RequestWithUser extends Request {
  user: UsersEntity;
}

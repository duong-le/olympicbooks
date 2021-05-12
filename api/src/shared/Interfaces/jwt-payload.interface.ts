import { UserType } from '../Enums/users.enum';

export interface JwtPayload {
  name: string;
  email: string;
  type: UserType;
}

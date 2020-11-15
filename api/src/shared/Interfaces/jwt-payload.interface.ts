import { Role } from '../Enums/roles.enum';

export interface JwtPayload {
  name: string;
  email: string;
  role: Role;
}

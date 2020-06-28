import { Role } from '../../shared/Enums/roles.enum';

export interface JwtPayload {
  name: string;
  email: string;
  role: Role;
}

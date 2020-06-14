import { UserRole } from '../users/users.entity';
export interface JwtPayload {
  name: string;
  email: string;
  role: UserRole;
}

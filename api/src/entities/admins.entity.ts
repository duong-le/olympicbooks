import { Entity } from 'typeorm';

import { User } from './users.entity';

@Entity()
export class Admin extends User {}

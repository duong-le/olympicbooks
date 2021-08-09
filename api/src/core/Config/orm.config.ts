import { config } from 'dotenv';
import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

import { SqlLogger } from '../Loggers/sql.logger';

config({ path: join(__dirname, '../../../.env') });

export default {
  type: 'postgres',
  host: process.env.SQL_HOST,
  port: 5432,
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_NAME,
  entities: [join(__dirname, '../../entities/**.entity{.ts,.js}')],
  migrations: [join(__dirname + '../../../migrations/*{.ts,.js}')],
  cli: { migrationsDir: 'src/migrations' },
  synchronize: true,
  migrationsRun: false,
  logger: new SqlLogger(['schema', 'error', 'warn', 'info', 'log', 'migration'])
} as ConnectionOptions;

import { Logger } from '@nestjs/common';
import { format } from 'sql-formatter';
import { Logger as TypeOrmLogger } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';

/**
 * Effectively ripped out from:
 * https://github.com/typeorm/typeorm/blob/master/src/logger/SimpleConsoleLogger.ts
 */
export class SqlLogger implements TypeOrmLogger {
  private logger = new Logger('PostgreSQL');

  constructor(private options?: LoggerOptions) {}

  formatSql(sql: string): string {
    return format(sql, { language: 'postgresql' });
  }

  logQuery(query: string, parameters?: any[]): void {
    if (
      this.options === 'all' ||
      this.options === true ||
      (Array.isArray(this.options) && this.options.includes('query'))
    ) {
      this.logger.log(
        'Query\n' +
          this.formatSql(query) +
          (parameters && parameters.length ? '\nPARAMETERS:' + this.stringifyParams(parameters) : '')
      );
    }
  }

  logQueryError(error: string, query: string, parameters?: any[]): void {
    if (
      this.options === 'all' ||
      this.options === true ||
      (Array.isArray(this.options) && this.options.includes('error'))
    ) {
      this.logger.error(
        'Failed Query\n' +
          this.formatSql(query) +
          (parameters && parameters.length ? '\nPARAMETERS: ' + this.stringifyParams(parameters) : '')
      );
      this.logger.error(error);
    }
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    this.logger.log(
      'Slow Query\n' +
        this.formatSql(query) +
        (parameters && parameters.length ? '\nPARAMETERS:' + this.stringifyParams(parameters) : '')
    );
    this.logger.log(`\nExecution time: ` + time);
  }

  logSchemaBuild(message: string): void {
    if (this.options === 'all' || (Array.isArray(this.options) && this.options.includes('schema'))) {
      this.logger.log(message);
    }
  }

  logMigration(message: string): void {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any): void {
    switch (level) {
      case 'log':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.includes('log')))
          this.logger.log(message);
        break;
      case 'info':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.includes('info')))
          this.logger.debug(message);
        break;
      case 'warn':
        if (this.options === 'all' || (Array.isArray(this.options) && this.options.includes('warn')))
          this.logger.warn(message);
        break;
    }
  }

  protected stringifyParams(parameters: any[]): any {
    try {
      return JSON.stringify(parameters, null, 2);
    } catch (error) {
      return parameters;
    }
  }
}

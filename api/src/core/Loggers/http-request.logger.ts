import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';

const logger = new Logger('HTTP Request');

export const HttpRequestLogger = morgan('dev', {
  stream: { write: (message) => logger.log(message.substring(0, message.lastIndexOf('\n'))) }
});

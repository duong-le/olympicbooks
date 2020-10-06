import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { CrudConfigService } from '@nestjsx/crud';
CrudConfigService.load({
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
    createOneBase: { returnShallow: true }
  }
});
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableCors({ origin: ['http://localhost:4200', 'http://localhost:3000', /.olympicbooks.com/] });
  app.set('trust proxy', 1);
  app.use(rateLimit({ windowMs: 60 * 60 * 1000, max: 500 }));
  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  if (process.env.NODE_ENV !== 'PRODUCTION') {
    const options = new DocumentBuilder().setTitle('Olympicbooks API v1').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/', app, document, { swaggerOptions: { docExpansion: 'none' } });
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();

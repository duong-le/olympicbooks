import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import { CrudConfigService } from '@rewiko/crud';
CrudConfigService.load({
  routes: {
    exclude: ['createManyBase', 'replaceOneBase', 'recoverOneBase'],
    createOneBase: { returnShallow: true }
  },
  query: {
    softDelete: true
  }
});
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.set('trust proxy', 1);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  if (process.env.NODE_ENV !== 'PRODUCTION') {
    const options = new DocumentBuilder().setTitle('Olympicbooks API v1').addBearerAuth().build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/', app, document, { swaggerOptions: { docExpansion: 'none' } });
    app.enableCors({ origin: true });
  } else {
    app.enableCors({ origin: [/.olympicbooks.com/] });
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();

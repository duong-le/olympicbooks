import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());

  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder().setTitle('Olymbooks API v1').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/v1', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();

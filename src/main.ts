import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from './utils/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    .useGlobalFilters(new PrismaExceptionFilter())
    .useStaticAssets('./public')
    .enableCors();

  const config = new DocumentBuilder()
    .setTitle('Ideias')
    .setDescription('The ideia API description')
    .setVersion(version)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  Logger.debug(`Server running ${env.BASE_URL_API} version ${version}`);
}
void bootstrap();

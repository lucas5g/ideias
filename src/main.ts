import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from './utils/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { version } from '../package.json';
import { PrismaExceptionFilter } from './prisma/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    .useGlobalFilters(new PrismaExceptionFilter())
    .enableCors();

  const config = new DocumentBuilder()
    .setTitle('Translate')
    .setDescription('The translate API description')
    .setVersion(version)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  Logger.debug(
    `Server running ${env.BASE_URL_API.includes('https') ? env.BASE_URL_API : await app.getUrl()} version ${version}`,
  );
}
void bootstrap();

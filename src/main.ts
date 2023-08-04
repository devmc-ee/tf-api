import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MenuModule } from './resto/v1/menu/menu.module';
import { MenuGroupModule } from './resto/v1/menu-group/menu-group.module';
import { MenuItemModule } from './resto/v1/menu-item/menu-item.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Resto API')
    .setDescription('The Resto API Docs')
    .setVersion('1.0')
    .addTag('resto')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [MenuModule, MenuGroupModule, MenuItemModule],
  });
  SwaggerModule.setup('resto/v1/docs', app, document);

  await app.listen(Number.parseInt(process.env.PORT) || 5003, process.env.HOST);
}
bootstrap();

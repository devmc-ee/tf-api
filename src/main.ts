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
import { fastifyHelmet as helmet } from '@fastify/helmet';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';
import { WorkingTimeModule } from './resto/v1/working-time/working-time.module';

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: true });
  adapter.enableCors({
    origin: [
      'https://bo.thaifood.ee',
      'https://thaifood.ee',
      process.env.NODE_ENV === 'dev' ? 'http://localhost:4200' : '',
      process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : '',
    ],
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore mismatch interface
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET, // for cookies signature
    parseOptions: {
      sameSite: 'none',
      secure: true,
      httpOnly: false,
    },
    hook: 'onRequest',
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore mismatch interface
  await app.register(helmet, { global: true });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore mismatch interface
  await app.register(fastifyCsrf, {
    cookieOpts: { signed: true },
  });

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
    include: [MenuModule, MenuGroupModule, MenuItemModule, WorkingTimeModule],
  });
  SwaggerModule.setup('resto/v1/docs', app, document);

  await app.listen(Number.parseInt(process.env.PORT) || 5003, process.env.HOST);
}
bootstrap();

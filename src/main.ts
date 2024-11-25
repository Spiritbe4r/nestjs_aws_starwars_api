import { Handler, Context } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { createServer, proxy } from 'aws-serverless-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

// let cachedServer: any;

// const bootstrapServer = async (): Promise<any> => {
//   const expressApp = express();
//   const adapter = new ExpressAdapter(expressApp);
//   const app = await NestFactory.create(AppModule, adapter);
//   app.enableCors();

//   // Configuración de Swagger
//   const config = new DocumentBuilder()
//     .setTitle('StarWars API Hexagonal')
//     .setDescription('API para gestionar personajes favoritos e integrar SWAPI')
//     .setVersion('1.0')
//     .build();
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api-docs', app, document);

//   // Aplicar el filtro de excepciones global
//   app.useGlobalFilters(new AllExceptionsFilter());

//   await app.init();
//   return createServer(expressApp);
// };

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   //callback: Callback,
// ) => {
//   if (!cachedServer) {
//     cachedServer = await bootstrapServer();
//   }
//   return proxy(cachedServer, event, context, 'PROMISE').promise;
// };

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('StarWars API Hexagonal')
    .setDescription('API para gestionar personajes favoritos e integrar SWAPI')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Aplicar el filtro de excepciones global
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Aplicación corriendo en http://localhost:${port}`);
  console.log(
    `Documentación de Swagger disponible en http://localhost:${port}/api-docs`,
  );
}

bootstrap();

import {
  ClassSerializerInterceptor,
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { middleware as expressCtx } from 'express-ctx';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ConfigurationService } from './configuration/configuration.service';
import { ConfigurationModule } from './configuration/configuration.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    new ExpressAdapter(),
    { cors: true },
    );
    app.set('trust proxy', 1); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    app.use(helmet());
    // app.setGlobalPrefix('/api'); use api as global prefix if you don't have subdomain
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
  
    app.enableVersioning();
    
    app.useGlobalPipes(
      new ValidationPipe({
      }),
    );
  
    const configService = app.select(ConfigurationModule).get(ConfigurationService);
    if (configService.documentationEnabled) {
      setupSwagger(app);
    }
  
    app.use(expressCtx);
  
    // Starts listening for shutdown hooks
    if (!configService.isDevelopment) {
      app.enableShutdownHooks();
    }
  
    const port = configService.appConfig.port;
  await app.listen(port);
  console.info(`server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();

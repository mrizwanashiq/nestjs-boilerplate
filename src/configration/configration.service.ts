import { Injectable } from '@nestjs/common';
import type { MongooseModuleOptions } from '@nestjs/mongoose';
@Injectable()
export class ConfigrationService {
  get mongooseConfig(): MongooseModuleOptions {
    return {
      uri:
        process.env.MONGODB_URI ||
        'mongodb://127.0.0.1:27017/nest-boiler-plate',
    };
  }
  get authConfig() {
    return {
      privateKey: process.env.JWT_PRIVATE_KEY,
      publicKey: process.env.JWT_PUBLIC_KEY,
      jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
    };
  }

  get documentationEnabled() {
    return process.env.ENABLE_DOCUMENTATION;
  }

  get appConfig() {
    return {
      port: process.env.PORT || 3000,
    };
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }
}

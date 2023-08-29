import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { StreamSchema } from './stream.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stream', schema: StreamSchema }]),
  ],
  controllers: [StreamController],
  providers: [StreamService],
})
export class StreamModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { SeriesSchema } from './series.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Series', schema: SeriesSchema }]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeasonController } from './season.controller';
import { SeasonService } from './season.service';
import { SeasonSchema } from './season.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Season', schema: SeasonSchema }]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}

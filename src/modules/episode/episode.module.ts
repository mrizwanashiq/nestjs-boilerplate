import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { EpisodeSchema } from './episode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Episode', schema: EpisodeSchema }]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GenreSchema } from './genre.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Genre', schema: GenreSchema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}

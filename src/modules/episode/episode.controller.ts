import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

//   import {
//     JWT_HEADER_PARAM,
//     NOT_ALLOWED_USER_MESSAGE,
//     userCanDoAction,
//   } from '../../shared/utils';
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { Episode } from './interface/episode.interface';

@Controller('episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post()
  async create(@Body() createEpisodeDto: CreateEpisodeDto) {
    await this.episodeService.create(createEpisodeDto);
  }

  @Get()
  async findAll(): Promise<Episode[]> {
    return this.episodeService.findAll();
  }

  @Get('season/:seasonId')
  async getEpisodeBySeasonId(
    @Param('seasonId') seasonId: string,
  ): Promise<Episode[]> {
    return this.episodeService.findEpisodeBySeasonId(seasonId);
  }

  @Patch('/:id')
  async update(
    @Body() updateEpisodeDto: UpdateEpisodeDto,
    @Param('id') id,
    //   @Headers(JWT_HEADER_PARAM) token,
  ) {
    const episode = await this.episodeService.getEpisode(id);
    //if (userCanDoAction(token, article.author)) {
    return await this.episodeService.update(updateEpisodeDto, id);
    //}
    throw new HttpException('NOT_ALLOWED_USER_MESSAGE', HttpStatus.FORBIDDEN);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.episodeService.delete(id);
  }
}

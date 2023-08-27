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
import { SeasonService } from './season.service';
import { CreateSeasonDto, UpdateSeasonDto } from './dto/season.dto';
import { Season } from './interface/season.interface';

@Controller('season')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Post()
  async create(@Body() createSeasonDto: CreateSeasonDto) {
    await this.seasonService.create(createSeasonDto);
  }

  @Get()
  async findAll(): Promise<Season[]> {
    return this.seasonService.findAll();
  }

  @Get(':seasonId')
  async getSeason(@Param('seasonId') seasonId: string): Promise<Season> {
    const season = await this.seasonService.findSeason(seasonId);
    return season;
  }

  @Get('series/:seriesId')
  async getSeasonsBySeriesId(
    @Param('seriesId') seriesId: string,
  ): Promise<Season[]> {
    return this.seasonService.findSeasonsBySeriesId(seriesId);
  }

  @Patch('/:id')
  async update(
    @Body() updateSeasonDto: UpdateSeasonDto,
    @Param('id') id,
    //   @Headers(JWT_HEADER_PARAM) token,
  ) {
    const season = await this.seasonService.getSeason(id);
    //if (userCanDoAction(token, article.author)) {
    return await this.seasonService.update(updateSeasonDto, id);
    //}
    throw new HttpException('NOT_ALLOWED_USER_MESSAGE', HttpStatus.FORBIDDEN);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.seasonService.delete(id);
  }
}

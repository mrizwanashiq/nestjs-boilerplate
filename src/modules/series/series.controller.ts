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
import { SeriesService } from './series.service';
import { CreateSeriesDto, UpdateSeriesDto } from './dto/series.dto';
import { Series } from './interface/series.interface';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Post()
  async create(@Body() createSeriesDto: CreateSeriesDto) {
    await this.seriesService.create(createSeriesDto);
  }

  @Get()
  async findAll(): Promise<Series[]> {
    return this.seriesService.findAll();
  }

  @Patch('/:id')
  async update(
    @Body() updateSeriesDto: UpdateSeriesDto,
    @Param('id') id,
    //   @Headers(JWT_HEADER_PARAM) token,
  ) {
    const series = await this.seriesService.update(updateSeriesDto, id);
    return series;
    // const series = await this.seriesService.getSeries(id);
    //if (userCanDoAction(token, article.author)) {
    // return await this.seriesService.update(updateSeriesDto, id);
    //}
    throw new HttpException('NOT_ALLOWED_USER_MESSAGE', HttpStatus.FORBIDDEN);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.seriesService.delete(id);
  }
}

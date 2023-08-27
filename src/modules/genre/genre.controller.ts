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
import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from './dto/genre.dto';
import { Genre } from './interface/genre.interface';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto) {
    await this.genreService.create(createGenreDto);
  }

  @Get()
  async findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Patch('/:id')
  async update(
    @Body() updateGenreDto: UpdateGenreDto,
    @Param('id') id,
    //   @Headers(JWT_HEADER_PARAM) token,
  ) {
    const genre = await this.genreService.getGenre(id);
    //if (userCanDoAction(token, article.author)) {
    return await this.genreService.update(updateGenreDto, id);
    //}
    throw new HttpException('NOT_ALLOWED_USER_MESSAGE', HttpStatus.FORBIDDEN);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.genreService.delete(id);
  }
}

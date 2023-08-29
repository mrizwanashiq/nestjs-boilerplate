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
import { StreamService } from './stream.service';
import { CreateStreamDto, UpdateStreamDto } from './dto/stream.dto';
import { Stream } from './interface/stream.interface';

@Controller('stream')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @Post()
  async create(@Body() createStreamDto: CreateStreamDto) {
    await this.streamService.create(createStreamDto);
  }

  @Get()
  async findAll(): Promise<Stream[]> {
    return this.streamService.findAll();
  }

  @Patch('/:id')
  async update(
    @Body() updateStreamDto: UpdateStreamDto,
    @Param('id') id,
    //   @Headers(JWT_HEADER_PARAM) token,
  ) {
    const stream = await this.streamService.getStream(id);
    //if (userCanDoAction(token, article.author)) {
    return await this.streamService.update(updateStreamDto, id);
    //}
    throw new HttpException('NOT_ALLOWED_USER_MESSAGE', HttpStatus.FORBIDDEN);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.streamService.delete(id);
  }

  @Get('user/:userId')
  async getStreamsByUserId(@Param('userId') userId: string): Promise<Stream[]> {
    return this.streamService.findStreamsByUserId(userId);
  }

  @Get('episode/:episodeId')
  async getStreamsByEpisodeId(
    @Param('episodeId') episodeId: string,
  ): Promise<Stream[]> {
    return this.streamService.findStreamsByEpisodeId(episodeId);
  }
}

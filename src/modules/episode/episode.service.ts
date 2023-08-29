import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { Episode } from './interface/episode.interface';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel('Episode') private readonly episodeModel: Model<Episode>,
  ) {}

  async create(createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    try {
      const createdEpisode = new this.episodeModel({
        name: createEpisodeDto.name,
        description: createEpisodeDto.description,
        season_id: createEpisodeDto.season_id,
      });
      return await createdEpisode.save();
    } catch (error) {
      throw new HttpException('Error creating Episode', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    updateEpisodeDto: UpdateEpisodeDto,
    id: string,
  ): Promise<Episode> {
    try {
      const episode = await this.findEpisode(id);
      episode.name = updateEpisodeDto.name;
      episode.description = updateEpisodeDto.description;
      episode.season_id = updateEpisodeDto.season_id;
      return await episode.save();
    } catch (error) {
      throw new HttpException('Error updating Episode', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.episodeModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException('Error deleting Episode', HttpStatus.BAD_REQUEST);
    }
  }

  async findEpisode(id: string): Promise<Episode> {
    let episode;
    try {
      episode = await this.episodeModel.findById(id).exec();
      return episode || null;
    } catch (error) {
      return null;
    }
  }

  async getEpisode(episodeId: string) {
    const episode = await this.findEpisode(episodeId);
    if (!episode) {
      throw new NotFoundException('Could not find Episode.');
    }
    return episode;
  }

  async findAll(): Promise<Episode[]> {
    return this.episodeModel.find().select({ __v: 0 }).exec();
  }

  async findEpisodeBySeasonId(seasonId: string): Promise<Episode[]> {
    return this.episodeModel.find({ season_id: seasonId }).exec();
  }
}

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSeasonDto, UpdateSeasonDto } from './dto/season.dto';
import { Season } from './interface/season.interface';

@Injectable()
export class SeasonService {
  constructor(
    @InjectModel('Season') private readonly seasonModel: Model<Season>,
  ) {}

  async create(createSeasonDto: CreateSeasonDto): Promise<Season> {
    try {
      const createdSeason = new this.seasonModel({
        name: createSeasonDto.name,
        description: createSeasonDto.description,
        series_id: createSeasonDto.series_id,
      });
      return await createdSeason.save();
    } catch (error) {
      throw new HttpException('Error creating Season', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateSeasonDto: UpdateSeasonDto, id: string): Promise<Season> {
    try {
      const season = await this.findSeason(id);
      season.name = updateSeasonDto.name;
      season.description = updateSeasonDto.description;
      season.series_id = updateSeasonDto.series_id;
      return await season.save();
    } catch (error) {
      throw new HttpException('Error updating season', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.seasonModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException('Error deleting season', HttpStatus.BAD_REQUEST);
    }
  }

  // async findSeason(id: string): Promise<Season> {
  //   let season;
  //   try {
  //     season = await this.seasonModel.findById(id).exec();
  //     return season || null;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  async getSeason(seasonId: string) {
    const season = await this.findSeason(seasonId);
    if (!season) {
      throw new NotFoundException('Could not find season.');
    }
    return season;
  }

  async findSeason(seasonId: string): Promise<Season | null> {
    return this.seasonModel.findById(seasonId).exec();
  }

  async findSeasonsBySeriesId(seriesId: string): Promise<Season[]> {
    return this.seasonModel.find({ series_id: seriesId }).exec();
  }

  async findAll(): Promise<Season[]> {
    return this.seasonModel.find().select({ __v: 0 }).exec();
  }
}

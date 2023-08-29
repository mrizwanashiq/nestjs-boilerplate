import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateSeriesDto, UpdateSeriesDto } from './dto/series.dto';
import { Series } from './interface/series.interface';

@Injectable()
export class SeriesService {
  constructor(
    @InjectModel('Series') private readonly seriesModel: Model<Series>,
  ) {}

  async create(createSeriesDto: CreateSeriesDto): Promise<Series> {
    try {
      const createdSeries = new this.seriesModel({
        name: createSeriesDto.name,
        description: createSeriesDto.description,
        genre_id: createSeriesDto.genre_id,
      });
      return await createdSeries.save();
    } catch (error) {
      throw new HttpException('Error creating Series', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateSeriesDto: UpdateSeriesDto, id: string): Promise<Series> {
    try {
      const series = await this.findSeries(id);
      series.name = updateSeriesDto.name;
      series.description = updateSeriesDto.description;
      series.genre_id = updateSeriesDto.genre_id;
      return await series.save();
    } catch (error) {
      throw new HttpException('Error updating series', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.seriesModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException('Error deleting series', HttpStatus.BAD_REQUEST);
    }
  }

  async findSeries(id: string): Promise<Series> {
    let series;
    try {
      series = await this.seriesModel.findById(id).exec();
      return series || null;
    } catch (error) {
      return null;
    }
  }

  async getSeries(seriesId: string) {
    const series = await this.findSeries(seriesId);
    if (!series) {
      throw new NotFoundException('Could not find series.');
    }
    return series;
  }

  async findAll(): Promise<Series[]> {
    return this.seriesModel.find().select({ __v: 0 }).exec();
  }
}

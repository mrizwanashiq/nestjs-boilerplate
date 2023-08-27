import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateGenreDto, UpdateGenreDto } from './dto/genre.dto';
import { Genre } from './interface/genre.interface';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel('Genre') private readonly genreModel: Model<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    try {
      const createdGenre = new this.genreModel({
        name: createGenreDto.name,
      });
      return await createdGenre.save();
    } catch (error) {
      throw new HttpException('Error creating genre', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateGenreDto: UpdateGenreDto, id: string): Promise<Genre> {
    try {
      const genre = await this.findGenre(id);
      genre.name = updateGenreDto.name;
      return await genre.save();
    } catch (error) {
      throw new HttpException('Error updating genre', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.genreModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException('Error deleting genre', HttpStatus.BAD_REQUEST);
    }
  }

  async findGenre(id: string): Promise<Genre> {
    let genre;
    try {
      genre = await this.genreModel.findById(id).exec();
      return genre || null;
    } catch (error) {
      return null;
    }
  }

  async getGenre(genreId: string) {
    const genre = await this.findGenre(genreId);
    if (!genre) {
      throw new NotFoundException('Could not find genre.');
    }
    return genre;
  }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.find().select({ __v: 0 }).exec();
  }
}

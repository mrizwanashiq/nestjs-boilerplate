import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateStreamDto, UpdateStreamDto } from './dto/stream.dto';
import { Stream } from './interface/stream.interface';

@Injectable()
export class StreamService {
  constructor(
    @InjectModel('Stream') private readonly streamModel: Model<Stream>,
  ) {}

  async create(createStreamDto: CreateStreamDto): Promise<Stream> {
    try {
      const createdStream = new this.streamModel({
        episode_id: createStreamDto.episode_id,
        user_id: createStreamDto.user_id,
      });
      return await createdStream.save();
    } catch (error) {
      throw new HttpException('Error creating Stream', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateStreamDto: UpdateStreamDto, id: string): Promise<Stream> {
    try {
      const stream = await this.findStream(id);
      stream.user_id = updateStreamDto.user_id;
      stream.episode_id = updateStreamDto.episode_id;
      return await stream.save();
    } catch (error) {
      throw new HttpException('Error updating Stream', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.streamModel.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException('Error deleting Stream', HttpStatus.BAD_REQUEST);
    }
  }

  async findStream(id: string): Promise<Stream> {
    let stream;
    try {
      stream = await this.streamModel.findById(id).exec();
      return stream || null;
    } catch (error) {
      return null;
    }
  }

  async getStream(streamId: string) {
    const stream = await this.findStream(streamId);
    if (!stream) {
      throw new NotFoundException('Could not find Stream.');
    }
    return stream;
  }

  async findAll(): Promise<Stream[]> {
    return this.streamModel.find().select({ __v: 0 }).exec();
  }

  async findStreamsByUserId(userId: string): Promise<Stream[]> {
    return this.streamModel.find({ user_id: userId }).exec();
  }

  async findStreamsByEpisodeId(episodeId: string): Promise<Stream[]> {
    return this.streamModel.find({ episode_id: episodeId }).exec();
  }
}

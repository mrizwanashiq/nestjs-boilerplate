import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import {
  IsInt,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Exclude, Transform } from 'class-transformer';
import { Episode } from '../episode/episode.schema';
import { User } from '../user/user.schema';
export type StreamDocument = Stream & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Stream {
  id: string;

  @OneToMany(() => Episode, (episode) => episode.id) // Use a string to reference the other class
  episode_id: Episode[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const StreamSchema = SchemaFactory.createForClass(Stream);

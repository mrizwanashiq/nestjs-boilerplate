import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
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
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Exclude, Transform } from 'class-transformer';
import { Genre } from '../genre/genre.schema';
import { Season } from '../season/season.schema';
export type SeriesDocument = Series & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Series {
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty()
  @Prop({ type: 'string', required: true, trim: true })
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty()
  @Prop({ type: 'string', required: true, trim: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }) // Correctly referencing the Genre schema
  genre_id: Genre | mongoose.Types.ObjectId;

  // @Prop({ type: Genre })
  // genre_id: Genre;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' })
  // genre_id: Genre;

  // next
  @OneToMany(() => Season, (season) => season.series_id)
  season_id: Season[];
}

export const SeriesSchema = SchemaFactory.createForClass(Series);

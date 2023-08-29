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
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Exclude, Transform } from 'class-transformer';
import { Series } from '../series/series.schema';
import { Episode } from '../episode/episode.schema';
export type SeasonDocument = Season & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Season {
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

  // previous
  @ManyToOne(() => Series, (series) => series.season_id) // Establish the one-to-many relationship
  series_id: Series[];

  // next
  @OneToMany(() => Episode, (episode) => episode.season_id)
  episode_id: Episode[];
}

export const SeasonSchema = SchemaFactory.createForClass(Season);

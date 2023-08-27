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
  JoinColumn,
} from 'typeorm';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Exclude, Transform } from 'class-transformer';
import { Season } from '../season/season.schema';
export type EpisodeDocument = Episode & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Episode {
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

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Season' })
  // season_id: mongoose.Schema.Types.ObjectId;
  // @OneToMany( () => Series,
  // (series) => series.)

  // @ManyToOne(() => Season) // Use a string to reference the other class
  // season_id: Season;

  @ManyToOne(() => Season, (season) => season.episode_id)
  @JoinColumn({ name: 'series_id' })
  season_id: Season;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode);

import { Document } from 'mongoose';

export interface Episode extends Document {
  id: String;
  name: String;
  description: String;
  season_id: String;
}

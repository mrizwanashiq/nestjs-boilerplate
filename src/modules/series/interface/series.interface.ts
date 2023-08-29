import { Document } from 'mongoose';

export interface Series extends Document {
  id: String;
  name: String;
  description: String;
  genre_id: String;
}

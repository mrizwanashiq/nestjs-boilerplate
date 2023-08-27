import { Document } from 'mongoose';

export interface Season extends Document {
  id: String;
  name: String;
  description: String;
  series_id: String;
}

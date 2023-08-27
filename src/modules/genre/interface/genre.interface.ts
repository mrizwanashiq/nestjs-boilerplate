import { Document } from 'mongoose';

export interface Genre extends Document {
  id: String;
  name: String;
}

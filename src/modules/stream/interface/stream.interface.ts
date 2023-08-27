import { Document } from 'mongoose';

export interface Stream extends Document {
  id: String;
  episode_id: String;
  user_id: String;
}

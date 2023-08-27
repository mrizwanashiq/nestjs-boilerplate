export class CreateStreamDto {
  episode_id: String;
  user_id: String;
}

export class UpdateStreamDto {
  user_id?: String;
  episode_id?: String;
}

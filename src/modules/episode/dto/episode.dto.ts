export class CreateEpisodeDto {
  name: String;
  description: String;
  season_id: String;
}

export class UpdateEpisodeDto {
  name?: String;
  description?: String;
  season_id?: String;
}

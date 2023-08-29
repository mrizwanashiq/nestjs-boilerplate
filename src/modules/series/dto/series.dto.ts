export class CreateSeriesDto {
  name: String;
  description: String;
  genre_id: String;
}

export class UpdateSeriesDto {
  name?: String;
  description?: String;
  genre_id?: String;
}

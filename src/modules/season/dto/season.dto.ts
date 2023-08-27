import { Series } from 'src/modules/series/series.schema';

export class CreateSeasonDto {
  name: String;
  description: String;
  series_id: String;
}

export class UpdateSeasonDto {
  name?: String;
  description?: String;
  series_id?: String;
}

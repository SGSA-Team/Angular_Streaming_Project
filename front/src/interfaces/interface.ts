export interface ApiCategories {
  genres: Genre[];
}
export interface ApiMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: string;
  overview: string;
  original_title: string;
  revenue: number;
  release_date: string;
  title: string;
  video: string | boolean | null;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

export interface ApiSerie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  genres: Genre[];
  homepage: string;
  id: string;
  media_type: string;
  overview: string;
  original_title: string;
  revenue: number;
  first_air_date: string;
  original_name: string;
  video: string | boolean | null;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ApiList {
  dates: ApiDates;
  page: number;
  results: ApiMovie[] | ApiSerie[] | any;
  total_results: number;
  total_pages: number;
}

export interface ApiDates {
  maximum: string;
  minimum: string;
}

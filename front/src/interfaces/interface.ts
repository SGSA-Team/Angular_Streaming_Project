export interface ApiCategories {
  genres: Genre[];
}
export interface ApiMovies {
  page: number;
  results: ApiMovie[];
  total_pages:number;
  total_results:number;
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
  status:string;
  tagline: string;
}

export interface ApiSerie {
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
  first_air_date: string;
  name: string;
  video: string | boolean | null;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  status:string;
  tagline: string;
}
export interface ApiSeries {
  page: number;
  results: ApiSerie[];
  total_results: number;
  total_pages: number;
}

export interface ApiSeriesResult {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path:string | null;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
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

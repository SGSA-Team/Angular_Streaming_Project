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

export interface Genre {
  id: number;
  name: string;
}

export interface ApiSearch {id:string,
  logo_path:string,
  name:string,
  origin_country:string}

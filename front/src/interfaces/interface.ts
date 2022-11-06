export interface ApiCategories {
  genres: Genre[];
}
export interface ApiMovies {
  page: number;
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
}
export interface ApiMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  overview: string;
  original_title: string;
  original_name: string;
  revenue: number;
  release_date: string;
  title: string;
  video: string | boolean | null;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  status: string;
  tagline: string;
}
export interface ApiSerie {
  adult: boolean;
  release_date: string;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  overview: string;
  original_title: string;
  original_name: string;
  title: string;
  revenue: number;
  first_air_date: string;
  name: string;
  video: string | boolean | null;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  status: string;
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
  backdrop_path: string | null;
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
  id: number;
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

export interface ApiVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}
export interface ApiVideos {
  id: number;
  results: ApiVideo[] | any;
}

export interface ApiPeople {
  adult: boolean;
  character: string;
  credit_id: number;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ApiCredit {
  crew: any;
  cast: ApiPeople[];
  id: number;
}

export interface TranslationLanguage {
  global: {
    movies: string,
  movie: string,
  series: string,
  serie: string
  },
  navbar: {
    options: {
      movies: string,
      series: string
  },
  search:{
      input: {
      placeHolder: string
      },
      buttonTxt: string
  }
  },
  home: {
    title: string,
    description: string,
    playingNow: string,
    trendingOnWeek: string,
    recentAddOn: string,
    newEpisode: string,
  },
  catalogs:{
        filters: {
            popular: string,
            vote: string,
            release_date: string
        }
  },
  customCard:{
    watch: string,
  },
  pagination: {
      page: string,
      outOf: string
  },
  modal:{
      see: string,
      description: string
  },
  detail:{
      seeMore: string,
      share: string,
      headliners: string,
      release: string,
      year_ago: string,
      noTrailer:string,
  },
  footer: {
      copyright: string,
      follow: string,
      legal: string,
      dataManagement: string,
      cpuRight: string,
      langue: string
  },
  language_selection:{
      title: string,
      options: {
          french: string,
          english:string,
          spanish: string
      }
  }
}
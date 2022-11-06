import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiMovie,
  ApiCategories,
  ApiList,
  ApiMovies,
  ApiVideos,
  ApiPeople,
  ApiCredit,
} from 'src/interfaces/interface';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public apiBaseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getMovieFromId = (id: string): Observable<ApiMovie> => {
    return this.http.get<ApiMovie>(`${this.apiBaseUrl}/movie/${id}`);
  };

  getPlayingMovies = (): Observable<ApiMovie[]> => {
    return this.http
      .get<ApiList>(`${this.apiBaseUrl}/movie/now_playing`, {
        params: {
          page: 1,
        },
      })
      .pipe(
        map((movies) => {
          return movies.results.slice(0, 10);
        })
      );
  };

  getVideos = (id: string) => {
    return this.http.get(`${this.apiBaseUrl}/movie/${id}/videos`);
  };

  getMoviesCategories(): Observable<ApiCategories> {
    return this.http.get<ApiCategories>(`${this.apiBaseUrl}/genre/movie/list`);
  }

  getPopular = (): Observable<ApiMovie[]> => {
    return this.http
      .get<ApiList>(`${this.apiBaseUrl}/trending/movie/week`, {
        params: {
          page: 1,
          region: 'FR',
        },
      })
      .pipe(
        map((movies) => {
          return movies.results.slice(0, 15);
        })
      );
  };

  getLatestMovies = (
    type: string = 'desc',
    page: number = 1,
    genreId?: number
  ): Observable<ApiMovies> => {
    const newDate = new Date();

    return this.http.get<ApiMovies>(`${this.apiBaseUrl}/discover/movie`, {
      params: {
        sort_by: `release_date.${type}`,
        page: page,
        'release_date.lte': `${newDate.getFullYear()}-12-31`,
        ...(genreId !== 0 && { with_genres: genreId }),
        with_original_language: 'en',
        include_adult: false,
        include_video: false,
        with_watch_monetization_types: 'flatrate',
        'vote_average.gte': 2,
      },
    });
  };

  getPopularMovies = (
    type: string = 'desc',
    page: number = 1,
    genreId: number = 0
  ): Observable<ApiMovies> => {
    const newDate = new Date();
    return this.http.get<ApiMovies>(`${this.apiBaseUrl}/discover/movie?`, {
      params: {
        sort_by: `popularity.${type}`,
        page: page,
        'release_date.lte': `${newDate.getFullYear()}-12-31`,
        ...(genreId !== 0 && { with_genres: genreId }),
        with_original_language: 'en',
        include_adult: false,
        include_video: false,
        with_watch_monetization_types: 'flatrate',
      },
    });
  };

  getRatedMovies = (
    type: string = 'desc',
    page: number = 1,
    genreId: number = 0
  ): Observable<ApiMovies> => {
    const newDate = new Date();
    return this.http.get<ApiMovies>(`${this.apiBaseUrl}/discover/movie`, {
      params: {
        sort_by: `vote_count.${type}`,
        page: page,
        'release_date.lte': `${newDate.getFullYear()}-12-31`,
        ...(genreId !== 0 && { with_genres: genreId }),
        with_original_language: 'en',
        include_adult: false,
        include_video: false,
        with_watch_monetization_types: 'flatrate',
      },
    });
  };

  getPeoples = (id: string) => {
    return this.http
      .get<ApiCredit>(`${this.apiBaseUrl}/movie/${id}/credits`)
      .pipe(
        map((peoples) => {
          return peoples.cast
            .filter((people: ApiPeople) => {
              return people.known_for_department == 'Acting';
            })
            .slice(0, 20);
        })
      );
  };

  getVideo = (id: number): Observable<ApiVideos> => {
    return this.http.get<ApiVideos>(`${this.apiBaseUrl}/movie/${id}/videos`);
  };

  getMoviesBySearchQuery = (query: string): Observable<ApiMovies> => {
    return this.http.get<ApiMovies>(
      `${this.apiBaseUrl}/search/movie?query=${query}`
    );
  };
}

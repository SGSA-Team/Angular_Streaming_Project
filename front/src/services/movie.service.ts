import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, take, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiMovie,
  ApiCategories,
  Genre,
  ApiList,
} from 'src/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public apiBaseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getMoviesFromId = (id: string): Observable<ApiMovie> => {
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
}

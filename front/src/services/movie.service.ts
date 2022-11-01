import { HttpClient } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable, of, take, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiMovie,
  ApiCategories,
  Genre,
  ApiList,
  //ApiMovieList, 
  ApiMovies 
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
  }

  getLatestMovies= (type:string="desc", page:number = 1, genreId:number = 0): Observable<ApiMovies> => {
    const newDate = new Date();
    
    return this.http.get<ApiMovies>(`${this.apiBaseUrl}/discover/movie?sort_by=release_date.${type}&page=${page}&release_date.lte=${newDate.getFullYear()}-12-31&${genreId!==0 && `with_genres=${genreId}&`}language=en-US&with_original_language=en&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`);
  };

  getPopularMovies= (type:string="desc", page:number = 1, genreId:number = 0): Observable<ApiMovies> => {
    const newDate = new Date();
    return this.http.get<ApiMovies>(`${this.apiBaseUrl}/discover/movie?sort_by=popularity.${type}&page=${page}&release_date.lte=${newDate.getFullYear()}-12-31&${genreId!==0 && `with_genres=${genreId}&`}language=en-US&with_original_language=en&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`);
};

  getRatedMovies= (type:string="desc", page:number = 1, genreId:number = 0): Observable<ApiMovies> => {
    const newDate = new Date();
    return this.http.get<ApiMovies>(`${this.apiBaseUrl}/discover/movie?sort_by=vote_count.${type}&page=${page}&release_date.lte=${newDate.getFullYear()}-12-31&${genreId!==0 && `with_genres=${genreId}&`}language=en-US&with_original_language=en&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`);
  };
}

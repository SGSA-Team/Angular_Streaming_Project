import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiCategories,
  ApiList,
  ApiMovie,
  ApiSerie,
  ApiSeries,
  ApiVideos,
} from 'src/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  public apiBaseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSeriesCategories(): Observable<ApiCategories> {
    return this.http.get<ApiCategories>(`${this.apiBaseUrl}/genre/tv/list`);
  }

  getPopular = (): Observable<ApiSerie[]> => {
    return this.http.get<ApiList>(`${this.apiBaseUrl}/trending/tv/week`).pipe(
      map((movies) => {
        return movies.results.slice(0, 15);
      })
    );
  };

  getLatestSeries = (
    type: string = 'desc',
    page: number = 1,
    genreId?: number
  ): Observable<ApiSeries> => {
    console.log('genreId', genreId);
    return this.http.get<ApiSeries>(
      `${
        this.apiBaseUrl
      }/discover/tv?sort_by=first_air_date.${type}&page=${page}&${
        genreId !== 0 && `with_genres=${genreId}&`
      }include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0&vote_average.gte=2`
    );
  };

  getPopularSeries = (
    type: string = 'desc',
    page: number = 1,
    genreId: number = 0
  ): Observable<ApiSeries> => {
    console.log('genreId', genreId);
    return this.http.get<ApiSeries>(
      `${this.apiBaseUrl}/discover/tv?sort_by=popularity.${type}&page=${page}&${
        genreId !== 0 && `with_genres=${genreId}&`
      }include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    );
  };

  getRatedSeries = (
    type: string = 'desc',
    page: number = 1,
    genreId: number = 0
  ): Observable<ApiSeries> => {
    return this.http.get<ApiSeries>(
      `${
        this.apiBaseUrl
      }/discover/tv?sort_by=vote_average.${type}&page=${page}&${
        genreId !== 0 && `with_genres=${genreId}&`
      }include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    );
  };

  getVideo  = (id: number): Observable<ApiVideos> => {
    return this.http.get<ApiVideos>(
      `${
        this.apiBaseUrl
      }/tv/${id}/videos`
    );
  };
}

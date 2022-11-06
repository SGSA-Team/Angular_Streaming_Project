import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiCategories,
  ApiCredit,
  ApiList,
  ApiMovie,
  ApiPeople,
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

  getSerieFromId = (id: string): Observable<ApiSerie> => {
    return this.http.get<ApiSerie>(`${this.apiBaseUrl}/tv/${id}`);
  };

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

  getVideos = (id: string) => {
    return this.http.get(`${this.apiBaseUrl}/tv/${id}/videos`);
  };

  getPeoples = (id: string) => {
    return this.http.get<ApiCredit>(`${this.apiBaseUrl}/tv/${id}/credits`).pipe(
      map((peoples) => {
        return peoples.cast
          .filter((people: ApiPeople) => {
            return people.known_for_department == 'Acting';
          })
          .slice(0, 20);
      })
    );
  };

  getLatestSeries = (
    type: string = 'desc',
    page: number = 1,
    genreId?: number
  ): Observable<ApiSeries> => {
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

  getVideo = (id: number): Observable<ApiVideos> => {
    return this.http.get<ApiVideos>(`${this.apiBaseUrl}/tv/${id}/videos`);
  };

  getSeriesBySearchQuery = (query: string): Observable<ApiSeries> => {
    return this.http.get<ApiSeries>(
      `${this.apiBaseUrl}/search/tv?query=${query}`
    );
  };
}

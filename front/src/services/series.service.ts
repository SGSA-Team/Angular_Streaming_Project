import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ApiCategories,
  ApiList,
  ApiMovie,
  ApiSerie,
  ApiSeries
} from 'src/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  public apiBaseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSeriesCategories(): Observable<ApiCategories> {
    return this.http.get<ApiCategories>(`${this.apiBaseUrl}/genre/tv/list`, {
      params: {
        language: 'fr-FR',
      },
    });
  }

  getPopular = (): Observable<ApiSerie[]> => {
    return this.http.get<ApiList>(`${this.apiBaseUrl}/trending/tv/week`).pipe(
      map((movies) => {
        return movies.results.slice(0, 15);
      })
    );
  };

  getLatestSeries= (type:string="desc", page:number = 1): Observable<ApiSeries> => {
    return this.http.get<ApiSeries>(`${this.apiBaseUrl}/discover/tv?sort_by=first_air_date.${type}&page=${page}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`);
  };

  getPopularSeries= (type:string="desc", page:number = 1): Observable<ApiSeries> => {
    return this.http.get<ApiSeries>(`${this.apiBaseUrl}/discover/tv?sort_by=popularity.${type}&page=${page}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`);
  };

  getRatedSeries= (type:string="desc", page:number = 1): Observable<ApiSeries> => {
    return this.http.get<ApiSeries>(`${this.apiBaseUrl}/discover/tv?sort_by=vote_average.${type}&page=${page}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`);
  };

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiMovie, ApiCategories, Genre } from 'src/interfaces/interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public apiBaseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getMoviesFromId(id: string): Observable<ApiMovie> {
    return this.http.get<ApiMovie>(`${this.apiBaseUrl}/movie/${id}`, {
      params: {
        language: 'fr-FR',
      },
    });
  }

 getMoviesCategories(): Observable<ApiCategories> {
    return this.http.get<ApiCategories>(`${this.apiBaseUrl}/genre/movie/list`, {
      params: {
        language: 'fr-FR',
      },
    });
  }

}

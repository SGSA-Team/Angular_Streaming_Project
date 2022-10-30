import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiCategories } from 'src/interfaces/interface';

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

}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSearch } from 'src/interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class RechercheService {

  constructor(private http:HttpClient) { }

  //getData(){

   // let url="https://api.themoviedb.org/3/search/company?api_key=d0cf98f3003cd0b22e77f20efd3b7edb&query=TEST&page=1";
    //return this.http.get(url);

  //}

  public apiBaseUrl: string = environment.baseUrl;

  getSearch(find: string): Observable<ApiSearch> {
    return this.http.get<ApiSearch>(`${this.apiBaseUrl}/search/company?api_key=d0cf98f3003cd0b22e77f20efd3b7edb&query=${find}`, {
      params: {
        language: 'fr-FR',
      },
    });
  }

}

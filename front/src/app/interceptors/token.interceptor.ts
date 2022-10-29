import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = environment.apiKey;
    let req = request;
    req = this.addToken(request, token);
    req = this.addLanguages(req);
    return next.handle(req);
  }

  addToken(req: HttpRequest<unknown>, token: string) {
    return req.clone({ params: req.params.append('api_key', token) });
  }

  addLanguages(req: HttpRequest<unknown>) {
    return req.clone({
      params: req.params.append('language', environment.defaultLanguage),
    });
  }
}

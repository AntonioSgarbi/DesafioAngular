import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from "@angular/router";
import {TokenService} from "../public/service/token.service";

const TOKEN_HEADER_KEY = 'authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    const token = this.tokenService.getToken();
    if (token != null) {
      request = this.addTokenHeader(request, token);
    }
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
        console.log('401 error');
        this.tokenService.removeTokens();
        this.router.navigate(['/login'])
      }
      return throwError(error);
    }));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone(
      {headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
  }

}

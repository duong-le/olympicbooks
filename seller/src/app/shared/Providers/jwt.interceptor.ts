import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthenticationService } from '../../pages/authentication/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.accessToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl)
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user.accessToken}` }
      });
    return next.handle(request);
  }
}

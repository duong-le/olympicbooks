import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Authentication } from '../../shared/Interfaces/authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<Authentication>;
  public user$: Observable<Authentication>;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userSubject = new BehaviorSubject<Authentication>(user);
    this.user$ = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  signIn(data: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(`${environment.apiUrl}/seller/auth`, data).pipe(
      map(({ accessToken }) => {
        const payload = this.decodeToken(accessToken as string);
        const user = { ...payload, accessToken };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  signOut() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  decodeToken(accessToken: string) {
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
  }
}

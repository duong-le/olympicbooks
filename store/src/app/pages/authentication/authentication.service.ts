import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Authentication } from 'src/app/shared/Interfaces/authentication.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<Authentication>;
  public user$: Observable<Authentication>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<Authentication>(
      JSON.parse(localStorage.getItem('user'))
    );
    this.user$ = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  signIn(data: Authentication): Observable<Authentication> {
    return this.http
      .post<Authentication>(`${environment.apiUrl}/auth/signin`, data)
      .pipe(
        map((response: any) => {
          const payload = JSON.parse(atob(response.accessToken.split('.')[1]));
          const user = { ...payload, accessToken: response.accessToken };
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  signUp(data: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(
      `${environment.apiUrl}/auth/signup`,
      data
    );
  }

  signOut() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}

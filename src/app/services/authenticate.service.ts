import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private currentUserSubject$: BehaviorSubject<IUser>;
  public currentUser$: Observable<IUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject$ = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser$ = this.currentUserSubject$.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject$.value;
  } 

  login(username: string, password: string) {
    let _user: IUser;
    return this.http.post<any>(`${environment.BASE_API_URI}/auth/login`, { username, password })
      .pipe(map(response => {
        _user = { ...response.message.user };
        _user.token = response.message.token;
        if (_user && _user.token) {
          localStorage.setItem('currentUser', JSON.stringify(_user));
          this.currentUserSubject$.next(_user);
        }
        return _user;
      }));
  }

  forget(username: string) {
    return this.http.post<any>(`${environment.BASE_API_URI}/auth/forget`, { username }) as Observable<any>;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject$.next({} as IUser);
  }
}

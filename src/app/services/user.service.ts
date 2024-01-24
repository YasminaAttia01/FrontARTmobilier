
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   
  constructor(
    private http:HttpClient,
    private authenticationService: AuthenticateService){}

  reqHeader():HttpHeaders  {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      return new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser') as string).token
      });
    }
    return new HttpHeaders({ 
      'Content-Type': 'application/json',
    });
  }

  registerUser(user:IUser):Observable<any> {
    return this.http.post(`${environment.BASE_API_URI}/auth/register`, user) as Observable<any>;
  }

  getAllUsers():Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/backoffice/users`, { headers: this.reqHeader() }) as Observable<any>
  }

  countUsers():Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/backoffice/user/total`, { headers: this.reqHeader() }) as Observable<any>
  }

  addUser(user:IUser):Observable<any>{
    user.isAdmin = true
    return this.http.post(`${environment.BASE_API_URI}/backoffice/user/ajouter`, user, { headers: this.reqHeader() }) as Observable<any>
  }

  removeArticle(user:IUser): Observable<any>{
     return this.http.delete(`${environment.BASE_API_URI}/backoffice/user/supprimer/${user._id}`, { headers: this.reqHeader() }) as Observable<any>
  }

  updateArticle(user:IUser):Observable<any>{
    return this.http.put(`${environment.BASE_API_URI}/backoffice/user/modifier/${user._id}`, user, { headers: this.reqHeader() }) as Observable<any>
  }

}

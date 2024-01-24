import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategorie } from '../models/categorie.model';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './authenticate.service';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {
   
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

  getAllCategories():Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/categories`, { headers: this.reqHeader() }) as Observable<any>
  }

  getCategorie(_id:string):Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/categorie/${_id}`, { headers: this.reqHeader() }) as Observable<any>
  }
  
  countCategories():Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/categorie/total`, { headers: this.reqHeader() }) as Observable<any>
  }

  addCategorie(categorie:ICategorie):Observable<any>{
      return this.http.post(`${environment.BASE_API_URI}/categorie/ajouter`, categorie, { headers: this.reqHeader() }) as Observable<any>
  }

  removeCategorie(categorie:ICategorie): Observable<any>{
     return this.http.delete(`${environment.BASE_API_URI}/categorie/supprimer/${categorie._id}`, { headers: this.reqHeader() }) as Observable<any>
  }

  updateCategorie(categorie:ICategorie):Observable<any>{
    return this.http.put(`${environment.BASE_API_URI}/categorie/modifier/${categorie._id}`, categorie, { headers: this.reqHeader() }) as Observable<any>
  }
}

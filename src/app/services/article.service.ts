import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../models/article.model';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService { 
   
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

  getAllArticles():Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/articles`) as Observable<any>
  }

  getArticle(_id:string):Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/article/${_id}`) as Observable<any>
  }
  
  countArticles():Observable<any>{
    return this.http.get(`${environment.BASE_API_URI}/article/total`, { headers: this.reqHeader() }) as Observable<any>
  }

  addArticle(article:IArticle):Observable<any>{
      return this.http.post(`${environment.BASE_API_URI}/article/ajouter`, article, { headers: this.reqHeader() }) as Observable<any>
  }

  removeArticle(article:IArticle): Observable<any>{
     return this.http.delete(`${environment.BASE_API_URI}/article/supprimer/${article._id}`, { headers: this.reqHeader() }) as Observable<any>
  }

  updateArticle(article:IArticle):Observable<any>{
    return this.http.put(`${environment.BASE_API_URI}/article/modifier/${article._id}`, article, { headers: this.reqHeader() }) as Observable<any>
  }
}

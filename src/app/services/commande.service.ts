import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IArticle } from '../models/article.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  placeholder: Array<IArticle>=[];
  cartItems$: BehaviorSubject<IArticle[]>;
  reqHeader$?: HttpHeaders
  
  constructor(
    private http:HttpClient,
    private notifyService: NotificationService) { 
    this.cartItems$ = new BehaviorSubject<IArticle[]>([]);

    const ls = this.getCartData();
    if(ls) this.cartItems$.next(ls);
  }

  addItem(article: IArticle){
    const ls = this.getCartData();
    let exist: any;

    if (ls) {
      exist = ls.find((item: IArticle) => {
        return item._id === article._id
      });
    }
    if (exist) {
      exist.qt++;
      this.setCartData(ls)
      this.notifyService.showSuccess("Quantite augmentee", "Achat")
    }
    else {
      if (ls) {
        const newData = [...ls, article];
        this.setCartData(newData)
        this.cartItems$.next(this.getCartData());
        this.notifyService.showSuccess("Article ajoute au panier", "Achat")
      }
      else {
      this.placeholder.push(article);
      this.setCartData(this.placeholder)
      this.cartItems$.next(this.getCartData());
      this.notifyService.showSuccess("Article ajoute au panier", "Achat")
      }
    }
  
  }

  setCartData(data: any){
    localStorage.setItem('cart', JSON.stringify(data));
  }

  getCartData(){
    return JSON.parse(localStorage.getItem('cart') as string)
  }

  cancelCartData(){
      const ls = this.getCartData();

      if (ls) {
        localStorage.removeItem('cart');
        this.cartItems$.next([]);
        this.notifyService.showSuccess("Vos achats sont annules", "Success")
      }

      window.location.reload();  
  }

  removeItem(article: IArticle){
    const ls = this.getCartData().filter((item: any) => {
      return item._id != article._id
    });

    this.setCartData(ls)
    this.cartItems$.next(this.getCartData());
    this.notifyService.showSuccess("L'article est supprime", "Success")
  }

  addQtItem(article: IArticle){
    const ls = this.getCartData();
    let exist: any;

    if (ls) {
      exist = ls.find((item: IArticle) => {
        return item._id === article._id
      });
    }
    if (exist) {
      exist.qt++;
      this.setCartData(ls)
      this.cartItems$.next(this.getCartData());
    }
  }

  minusQtItem(article: IArticle){
    const ls = this.getCartData();
    let exist: any;

    if (ls) {
      exist = ls.find((item: IArticle) => {
        return item._id === article._id
      });
    }
    if (exist && exist.qt > 1) {
      exist.qt--;
      this.setCartData(ls)
      this.cartItems$.next(this.getCartData());
    }
  }


  addCommande():Observable<any>{
    this.reqHeader$ =  new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('currentUser') as string).token
    });

    var totalCart = 0;
    this.getCartData().map((item: any) => {
      return totalCart += item.qt * item.prix
    })
    const data = {
      total: totalCart.toString(),
      user: JSON.parse(localStorage.getItem('currentUser') as string),
      commandeDetail: JSON.stringify(this.getCartData()).slice(1, -1)
    }

    /* console.log(data.commandeDetail)
    console.log(JSON.stringify(data.commandeDetail))
    console.log(JSON.parse(JSON.stringify(data.commandeDetail).slice(1, -1)))
    console.log(JSON.parse(JSON.stringify(data.commandeDetail))) */

    return this.http.post(`${environment.BASE_API_URI}/backoffice/commande/ajouter`, data, { headers: this.reqHeader$ }) as Observable<any>
}

}

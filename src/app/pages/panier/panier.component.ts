import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/models/article.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CommandeService } from 'src/app/services/commande.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  articles?: any;
  totalCart?: any;

  loadingConfirm = false;

  constructor(
    private commandeService: CommandeService,
    private router: Router,
    private route$: ActivatedRoute,
    private notifyService: NotificationService,
    private authenticationService: AuthenticateService) { }

  ngOnInit(): void {
    this.commandeService.cartItems$.subscribe(e => {
      this.articles = e;
      this.totalCart = 0;
      this.articles.map((item: any) => {
        return this.totalCart += item.qt * item.prix
      });
    });
  }

  onCancel() {
    this.commandeService.cancelCartData()
  }

  onDelete(article: IArticle) {
    this.commandeService.removeItem(article)
  }

  addQt(article: IArticle){
    this.commandeService.addQtItem(article)
  }

  minusQt(article: IArticle){
    this.commandeService.minusQtItem(article)
  }

  onConfirm() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
      this.loadingConfirm = true;
      this.commandeService.addCommande().subscribe({
        next:(res)=>{
          if(res.status==="Success"){
            this.route$.url.subscribe( value =>
              this.notifyService.showSuccess("Votre commande est enregistrer", "Succes")
            ); 
            this.loadingConfirm = false
            this.commandeService.cancelCartData()
          }
          else if (res.status==="Error"){
            console.log(res)
            this.notifyService.showError("Message erreur", "Erreur")
            this.loadingConfirm = false
          }
        },
        error:(error)=>{
          this.notifyService.showError("Message erreur", "Erreur")
          this.loadingConfirm = false
        },
        complete:()=>{}
      })
    }
    else{
      this.notifyService.showError("Connecter vous pour confirmer la commande", "Erreur")
    }
  }
}

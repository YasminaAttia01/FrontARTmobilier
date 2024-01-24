import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/models/article.model';
import { CommandeService } from '../../services/commande.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article?: any;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route$: ActivatedRoute,
    private commandeService: CommandeService ) { }

  ngOnInit(): void {
    const _id = this.route$.snapshot.params['_id']

    this.articleService.getArticle(_id).subscribe(data => {
      if(data.status==="error"){
        this.article=[];
      }
      else{
        this.article=data.message.articles
      }
    })
  }

  addToCart(article:IArticle){
    this.commandeService.addItem(article);
  }

}

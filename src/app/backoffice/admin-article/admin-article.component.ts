import { Component, OnInit } from '@angular/core';
import { IArticle } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { NotificationService } from '../../services/notification.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-article',
  templateUrl: './admin-article.component.html',
  styleUrls: ['./admin-article.component.css']
})
export class AdminArticleComponent implements OnInit {
  articles?: any;

  closeResult: string = '';

  constructor(
    private articleService: ArticleService,
    private notifyService: NotificationService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.articleService.getAllArticles().subscribe(data => {
      if(data.status==="Error"){
        this.articles=[];
      }
      else{
        this.articles=data.message.articles
      }
    })
  }

  onDelete(currentArticle:IArticle) {
    this.articleService.removeArticle(currentArticle).subscribe(data => {
      if(data.status==="Error"){
        this.notifyService.showError("Message erreur", "Erreur")
      }
      else{
        this.notifyService.showSuccess("Message success", "Succes")
        window.location.reload();   
      }
    })
  }

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

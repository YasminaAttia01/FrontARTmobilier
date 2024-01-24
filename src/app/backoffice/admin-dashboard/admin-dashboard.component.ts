import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  countCategorie?: any;
  countArticle?: any;
  countVisiteurs?: any;
  countAdmins?: any;

  constructor(
    private categorieService: CategorieService,
    private articleService: ArticleService,
    private userService: UserService,) { }

    ngOnInit(): void {
      this.categorieService.countCategories().subscribe(data => {
        if(data.status==="Error"){
          this.countCategorie= '0';
        }
        else{
          this.countCategorie=data.message.count
        }
      })

      this.articleService.countArticles().subscribe(data => {
        if(data.status==="Error"){
          this.countArticle= '0';
        }
        else{
          this.countArticle=data.message.count
        }
      })

      this.userService.countUsers().subscribe(data => {
        if(data.status==="Error"){
          this.countVisiteurs= '0';
          this.countAdmins= '0';
        }
        else{
          this.countVisiteurs=data.message.visiteurCount
          this.countAdmins=data.message.adminCount
        }
      })
    }
  

}

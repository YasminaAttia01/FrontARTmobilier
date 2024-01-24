import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-admin-article-add',
  templateUrl: './admin-article-add.component.html',
  styleUrls: ['./admin-article-add.component.css']
})
export class AdminArticleAddComponent implements OnInit {
  categories?: any;

  articleForm = this.formbuilder.group({
    name:['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    prix: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    categorie: ['', Validators.required],
  });

  submitted = false;
  loadingSubmit = false;

  constructor(
    private formbuilder: FormBuilder,
    private articleService: ArticleService, 
    private router: Router,
    private route$: ActivatedRoute,
    private notifyService: NotificationService,
    private categorieService: CategorieService) {}

    ngOnInit(): void {
      this.categorieService.getAllCategories().subscribe(data => {
        if(data.status==="Error"){
          this.categories=[];
        }
        else{
          this.categories=data.message.categories
        }
      })
    }

  onSubmit(): void {
    this.submitted = true;
    if (this.articleForm.valid) {
      this.loadingSubmit = true;
      this.articleService.addArticle(this.articleForm.value).subscribe({
        next:(res)=>{
          if(res.status==="Success"){
            this.route$.url.subscribe( value =>
              this.router.navigate(['admin/articles'])
            ); 
          }
          else if (res.status==="Error"){
            this.notifyService.showError("Message erreur", "Erreur")
            this.loadingSubmit = false
          }
        },
        error:(error)=>{
          this.notifyService.showError("Message erreur", "Erreur")
          this.loadingSubmit = false
        },
        complete:()=>{}
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.articleForm.reset();
  }

}

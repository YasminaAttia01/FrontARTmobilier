import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-admin-categorie-add',
  templateUrl: './admin-categorie-add.component.html',
  styleUrls: ['./admin-categorie-add.component.css']
})
export class AdminCategorieAddComponent implements OnInit {
  categorieForm = this.formbuilder.group({
    name:['', Validators.required]
  });

  submitted = false;
  loadingSubmit = false;

  constructor(
    private formbuilder: FormBuilder,
    private articleService: CategorieService, 
    private router: Router,
    private route$: ActivatedRoute,
    private notifyService: NotificationService) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.categorieForm.valid) {
      this.loadingSubmit = true;
      this.articleService.addCategorie(this.categorieForm.value).subscribe({
        next:(res)=>{
          if(res.status==="Success"){
            this.route$.url.subscribe( value =>
              this.router.navigate(['admin/categories'])
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
    this.categorieForm.reset();
  }

}

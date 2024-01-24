import { Component, OnInit } from '@angular/core';
import { ICategorie } from '../../models/categorie.model';
import { CategorieService } from '../../services/categorie.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-categorie',
  templateUrl: './admin-categorie.component.html',
  styleUrls: ['./admin-categorie.component.css']
})
export class AdminCategorieComponent implements OnInit {
  categories?: any;

  constructor(
    private categorieService: CategorieService,
    private notifyService: NotificationService) { }

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

  onDelete(currentCategorie:ICategorie) {
    this.categorieService.removeCategorie(currentCategorie).subscribe(data => {
      if(data.status==="Error"){
        this.notifyService.showError("Message erreur", "Erreur")
      }
      else{
        this.notifyService.showSuccess("Message success", "Succes")
        window.location.reload();   
      }
    })
  }

}

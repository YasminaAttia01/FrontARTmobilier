import { Component, Input, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/services/commande.service';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userInfo:any;

  itemCart?: number;
  
  constructor(
    private authenticateService:AuthenticateService,
    private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.cartItems$.subscribe(e => {
      this.itemCart = e.length;
    });
  }

  logout(){
    this.authenticateService.logout();
    window.location.reload();       
  }

}

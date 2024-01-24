import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';
  currentUser?: any;
  subscription?:any;

  constructor(
    private authenticationService: AuthenticateService
  ) { }
  
  
  ngOnInit(): void {
    this.subscription= this.authenticationService.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user
      }
    })
  }
    
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.formbuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submitted = false;
  loadingSubmit = false;

  constructor(
    private formbuilder: FormBuilder,
    private authenticationService:AuthenticateService, 
    private router:Router,
    private route$:ActivatedRoute,
    private notifyService: NotificationService) {}

    onSubmit(): void {
      this.submitted = true;
      if (this.loginForm.valid) {
        this.loadingSubmit = true;
          this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(first())
        .subscribe({
          next:(res)=>{
            console.log(res)
            this.router.navigate([''])
          },
          error:(error)=>{
            this.notifyService.showError("Votre pseudo ou mot de passe est incorrect", "Erreur de connection")
            this.loadingSubmit = false
          },
          complete:()=>{}
        })
      } 
    }

    onReset() {
      this.submitted = false;
      this.loginForm.reset();
    }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateService } from '../../services/authenticate.service';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  forgetForm = this.formBuilder.group({
    username: ['', Validators.required],
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticateService, 
    private router:Router,
    private route$:ActivatedRoute,
    private notifyService: NotificationService) {}

    onSubmit(): void {
      this.submitted = true;
      if (this.forgetForm.valid) {
          this.authenticationService.forget(this.forgetForm.value.username)
          .pipe(first())
          .subscribe({
            next:(res)=>{
              this.forgetForm.reset();
              this.notifyService.showSuccess("Verifier votre boite email pour reinitialiser le mot de passe", "Succes")
            },
            error:(error)=>{
              this.notifyService.showError("Votre pseudo est incorrect", "Erreur de connection")
            },
            complete:()=>{}
          })
      } 
    }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent  {
  registerForm = this.formbuilder.group({
    name:['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitted = false;
  loadingSubmit = false;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService, 
    private router: Router,
    private route$: ActivatedRoute,
    private notifyService: NotificationService) {}

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.loadingSubmit = true;
      this.userService.registerUser(this.registerForm.value).subscribe({
        next:(res)=>{
          if(res.status==="Success"){
            this.route$.url.subscribe( value =>
              this.router.navigate(['auth/login'])
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
    this.registerForm.reset();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-user-add',
  templateUrl: './admin-user-add.component.html',
  styleUrls: ['./admin-user-add.component.css']
})
export class AdminUserAddComponent implements OnInit {
  adminForm = this.formbuilder.group({
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

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.adminForm.valid) {
      this.loadingSubmit = true;
      this.userService.addUser(this.adminForm.value).subscribe({
        next:(res)=>{
          if(res.status==="Success"){
            this.route$.url.subscribe( value =>
              this.router.navigate(['admin/users'])
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
    this.adminForm.reset();
  }

}

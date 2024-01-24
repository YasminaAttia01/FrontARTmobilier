import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminArticleAddComponent } from './backoffice/admin-article-add/admin-article-add.component';
import { AdminArticleEditComponent } from './backoffice/admin-article-edit/admin-article-edit.component';
import { AdminArticleComponent } from './backoffice/admin-article/admin-article.component';
import { AdminCategorieAddComponent } from './backoffice/admin-categorie-add/admin-categorie-add.component';
import { AdminCategorieEditComponent } from './backoffice/admin-categorie-edit/admin-categorie-edit.component';
import { AdminCategorieComponent } from './backoffice/admin-categorie/admin-categorie.component';
import { AdminCommandeComponent } from './backoffice/admin-commande/admin-commande.component';
import { AdminDashboardComponent } from './backoffice/admin-dashboard/admin-dashboard.component';
import { AdminUserAddComponent } from './backoffice/admin-user-add/admin-user-add.component';
import { AdminUserComponent } from './backoffice/admin-user/admin-user.component';
import { AproposComponent } from './pages/apropos/apropos.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PanierComponent } from './pages/panier/panier.component';
import { PasswordComponent } from './pages/password/password.component';
import { RegisterComponent } from './pages/register/register.component';
import { IsAdminGuard } from './permissions/is-admin.guard';
import { UserAuthGuard } from './permissions/user-auth.guard';
import { UserNotAuthGuard } from './permissions/user-not-auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "auth/login",
    component: LoginComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: "auth/register",
    component: RegisterComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: "auth/password",
    component: PasswordComponent,
    canActivate: [UserAuthGuard]
  },
  {
    path: "articles",
    component: ArticlesComponent
  },
  {
    path: "articles/:_id",
    component: ArticleComponent
  },
  {
    path: "apropos",
    component: AproposComponent
  },
  {
    path: "panier",
    component: PanierComponent
  },
  {
    path: "admin/dashboard",
    component: AdminDashboardComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/users",
    component: AdminUserComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/user/ajouter",
    component: AdminUserAddComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/commandes",
    component: AdminCommandeComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/articles",
    component: AdminArticleComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/article/ajouter",
    component: AdminArticleAddComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/article/modifier/:_id",
    component: AdminArticleEditComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/categories",
    component: AdminCategorieComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/categorie/ajouter",
    component: AdminCategorieAddComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path: "admin/categorie/modifier/:_id",
    component: AdminCategorieEditComponent,
    canActivate: [UserNotAuthGuard, IsAdminGuard]
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

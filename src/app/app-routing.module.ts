import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import{PageNotFoundComponent}from './components/page-not-found/page-not-found.component'
import { ProductComponent } from './components/product/product.component';

//rutas de navegacion
const routes: Routes = [

  //nos redirige a la pagina principal
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},  
  { path: 'registro', component: RegisterComponent},
  { path: 'productos', component: ProductComponent},
    //ruta 404
  {path:'**',component:PageNotFoundComponent}

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
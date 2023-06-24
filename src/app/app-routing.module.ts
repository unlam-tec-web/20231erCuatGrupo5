import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import{PageNotFoundComponent}from './components/page-not-found/page-not-found.component'
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { PedidoComponent } from './components/pedido/pedido.component';

//rutas de navegacion
const routes: Routes = [

  //nos redirige a la pagina principal
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},  
  { path: 'registro', component: RegisterComponent},
  //{ path: 'productos', component: ProductComponent},
  { path: 'categoria', component: CategoryComponent},
  //{ path: 'pedido', component: PedidoComponent}
  { path: 'pedido',component: PedidoComponent},
    //ruta 404
  {path:'**',component:PageNotFoundComponent}

  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
/*import { RegistroComponent } from './componentes/registro/registro.component';*/

//rutas de navegacion
const routes: Routes = [

  { path: 'Login',component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
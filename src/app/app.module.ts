import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    LoginComponent,
    ProductComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        RouterOutlet
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

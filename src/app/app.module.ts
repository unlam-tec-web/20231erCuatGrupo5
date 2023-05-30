import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import{HeaderComponent} from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatButtonModule} from  '@angular/material/button' ;
import {MatToolbarModule} from  '@angular/material/toolbar' ;
import {MatBadgeModule} from  '@angular/material/badge' ;
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';









@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    ProductComponent,
    RegisterComponent,
    PageNotFoundComponent,
    NavComponent
    
 
  ],
  imports: [
  FormsModule,
    ReactiveFormsModule,
    BrowserModule,
   AppRoutingModule,
   HttpClientModule,
   NgbModule,
   BrowserAnimationsModule,
   MatToolbarModule,
   MatButtonModule,
   MatIconModule,
   MatBadgeModule,
   MatDividerModule,
   MatTableModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
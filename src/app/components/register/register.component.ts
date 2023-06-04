import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(private router: Router, private dialog: MatDialog) {
  }

  OpenLogin() {

    this.router.navigate(['/home'])
    setTimeout(() => {
      console.log("#################HOLAAAAAAAA#################");
      const dialogRef = this.dialog.open(CartComponent,{},);
      // Realizar la acción deseada después del retraso
    }, 300);
  }
}


import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from '../login/login.component'
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    public dialog : MatDialog
  ) {
  }

  openDialog():void{
    const dialogRef = this.dialog.open(CartComponent,{},);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}


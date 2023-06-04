import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from '../register/register.component'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(
    public dialog : MatDialog
  ) {
  }

  openDialog():void{
    const dialogRef = this.dialog.open(RegisterComponent,{},);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }


}

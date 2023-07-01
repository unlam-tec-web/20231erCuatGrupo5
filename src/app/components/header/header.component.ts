import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { NavComponent } from '../nav/nav.component';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog : MatDialog,public navComponet:NavComponent) { }

  ngOnInit() {
  }


  openDialog():void{
    const dialogRef = this.dialog.open(LoginComponent,{},);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}


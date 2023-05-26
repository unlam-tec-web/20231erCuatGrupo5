import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  RegisterForm:FormGroup;
  IsValidRegister: boolean;
  FormSubmited: boolean;
  FirstName: string;
  LastName: string;
  Adress: string;
  Email: string;
  Password: string;
  model: any = {};

  constructor(private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) { this.IsValidRegister = false; }

  ngOnInit(): void {
    console.log("#########################COMENZANDO REGISTRO#########################");
    this.RegisterForm = this.formBuilder.group({
        FirstName: new FormControl('', Validators.required),
        LastName: new FormControl('', Validators.required),
        Adress: new FormControl('', Validators.required),
        Email: new FormControl('', Validators.required),
        Password: new FormControl('', Validators.required),
      }
    )
  }

  OpenLogin() {
    this.router.navigate(['/home'])
    setTimeout(() => {
      console.log("#################HOLAAAAAAAA#################");
      const dialogRef = this.dialog.open(LoginComponent,{},);
    }, 300);
  }

  Registrarse(){
    console.log("REGISTRANDOSE")
    this.FirstName = this.RegisterForm.get('FirstName').value;
    this.LastName = this.RegisterForm.get('LastName').value;
    this.Adress = this.RegisterForm.get('Adress').value;
    this.Email = this.RegisterForm.get('Email').value;
    this.Password = this.RegisterForm.get('Password').value;
    var res = {
      'FirstName': this.FirstName,
      'LastName': this.LastName,
      'Adress': this.Adress,
      'Email': this.Email,
      'Password': this.Password
    };
    console.log(res)
    this.FormSubmited = true;
  }

}


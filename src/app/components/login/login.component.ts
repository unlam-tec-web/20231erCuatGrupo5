import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Router } from '@angular/router';

let usuarios = [
  {
    "id": 1,
    "nombre": "Agustín",
    "mail": "usuario1@example.com",
    "password": "contraseña1",
    "rol": "admin"
  },
  {
    "id": 2,
    "nombre": "Lili",
    "mail": "usuario2@example.com",
    "password": "contraseña2",
    "rol": "user"
  }];
@Component({
  selector: 'app-cart',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  IsValidLogin: boolean;
  User: string;
  LoginPassword: string;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef:MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private router: Router) { 
      this.IsValidLogin = false; 
    }

  ngOnInit(): void {
    console.log("#########################COMENZANDO#########################");
    this.LoginForm = this.formBuilder.group({
        UserLogin: new FormControl('', Validators.required),
        LoginPassword: new FormControl('', Validators.required)
      }
    )
  }

  Login(){
    var res
    this.IsValidLogin = true;
    this.User = this.LoginForm.get('UserLogin').value;
    this.LoginPassword = this.LoginForm.get('LoginPassword').value;
     res = {
      'User': this.User,
      'Password': this.LoginPassword
    };

    let esAdmin = this.validarUsuarioAdministrador(res);
    this.validarRol(esAdmin, res);
  
    this.CloseDialog()
    }

     private validarUsuarioAdministrador(res): boolean{
      let esAdmin:boolean = false;
      for(let i=0;i<usuarios.length;i++){
        if(usuarios[i].mail===res.User && usuarios[i].password===res.Password){ //usuarios[i].mail===res.User && usuarios[i].password===res.Password
          esAdmin=true;
        }
      }
      return esAdmin;
    }

    private validarRol(admin: boolean, res: string) {
      if(admin){
        sessionStorage.setItem("loginAdmin", JSON.stringify(res));  
          
      }else {
        sessionStorage.setItem("login", JSON.stringify(res));  
      }  
    }

  IrARegistro(){
    this.CloseDialog();
    setTimeout(() => {
      this.router.navigate(['/registro']);
    }, 200);
  }

  CloseDialog() {
    this.dialogRef.close();
  }
}

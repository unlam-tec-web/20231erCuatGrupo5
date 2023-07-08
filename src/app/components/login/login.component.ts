import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

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
  errorMessage : string;
  mostrarLoading : boolean = false ;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef:MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string,
    private router: Router,
    private userService : UserService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog,
    private cookieService: CookieService) { 
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
  IrAVerificarCuenta(){
    this.CloseDialog();
    setTimeout(() => {
      this.router.navigate(['/accountVerification']);
    }, 200);
  }

  CloseDialog() {
    this.dialogRef.close();
  }
  login():void{
    
    if (this.LoginForm.valid) {
      const userData = {
        Username: this.LoginForm.get('UserLogin').value,
        Password: this.LoginForm.get('LoginPassword').value
      };
      this.userService.login(userData).subscribe(
        response => {
          // Aquí puedes mostrar un mensaje de éxito en tu front-end si lo deseas
          let snackBarRef = this.snackBar.open('Usuario verificado exitosamente. Serás redirigido al home.', '', {
            duration : 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.mostrarLoading = false;
            this.router.navigate(['/home']);
            this.dialog.closeAll();
          });
        },
        error => {
          // Manejar el error del servicio y mostrar el mensaje correspondiente
          this.errorMessage = error.error.message;
        }
      );
    }
    
  }
}

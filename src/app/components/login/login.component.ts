import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialog : MatDialog) { 
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
    this.IsValidLogin = true;
    this.User = this.LoginForm.get('UserLogin').value;
    this.LoginPassword = this.LoginForm.get('LoginPassword').value;
    var res = {
      'User': this.User,
      'Password': this.LoginPassword
    };
    console.log(res)
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
          this.errorMessage = "La combinacion de usuario y contraseña no es correcta";
        }
      );
    }
  }
}

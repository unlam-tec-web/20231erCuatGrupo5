import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Router } from '@angular/router';

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
    private router: Router) { this.IsValidLogin = false; }

  ngOnInit(): void {
    console.log("#########################COMENZANDO#########################");
    this.LoginForm = this.formBuilder.group({
        UserLogin: new FormControl('', Validators.required),
        LoginPassword: new FormControl('', Validators.required)
      }
    )
  }

  Login(){
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
}

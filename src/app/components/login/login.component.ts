import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
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
    @Inject(MAT_DIALOG_DATA) public message: string) { this.IsValidLogin = false; }

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

  CloseDialog() {
    this.dialogRef.close();
  }
}


/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      Nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      // Otros campos del formulario
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    // Lógica para enviar el formulario
  }
}
*/

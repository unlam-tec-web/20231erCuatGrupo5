import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private router: Router, 
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  formRegistro = this.formBuilder.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    direccion: ['', Validators.required],
    email: ['', [Validators.required,Validators.pattern('^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,5}$')]],
    contrasenia: ['', [Validators.required, Validators.minLength(8)]]
  })
  
  ngOnInit(): void {
  }

  IrAInicio() {
    this.router.navigate(['/home']);
  }
}


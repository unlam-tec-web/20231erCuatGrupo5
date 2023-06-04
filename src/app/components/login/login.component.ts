import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';


@Component({
  //selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  visibility : Boolean;
  Accion:string;
  validRegister:boolean;
  validLogin:boolean;

  usuarioLogin:string;
  contraseniaLogin:string;


  usuarioRegister:string;
  emailRegister:string;
  contraseniaRegister:string;

  formLogin:FormGroup
  //formregister,formlogin definen la propiedad para almacenar el formulario
  formRegister:FormGroup;
  constructor(protected router:Router,private formBuilder:FormBuilder,protected httpclient:HttpClient	) {
      this.visibility=true;
      this.Accion='Inicia Sesion'
      this.validRegister=false
      this.validLogin=false
  }

  ngOnInit(): void {
    console.log('iniciando app componente')
    this.formLogin=this.formBuilder.group({
      usuarioLogin:new FormControl('',Validators.required),
      contraseniaLogin:new FormControl('',Validators.required)
    })

    this.formRegister=this.formBuilder.group({
      usuarioRegister:new FormControl('',Validators.required),
      emailRegister:new FormControl('',[Validators.email,Validators.required]),
      contraseniaRegister:new FormControl('',[Validators.minLength(5),Validators.required])



    })

  }

  showForm(){

  this.visibility=true
  this.Accion='Inicia Sesion'
}


showFormhiden(){
this.visibility=false
this.Accion='Registrate'

}

login(){

  this.usuarioLogin=this.formLogin.get('usuarioLogin').value;
  this.contraseniaLogin=this.formLogin.get('contraseniaLogin').value;
  console.log('usuarioLogin' + this.usuarioLogin + '  contraseniaLogin  '+ this.contraseniaLogin)


}

registro(){
  this.validRegister=true

if(this.formRegister.valid){
console.log('ejecuta el form registro')
this.usuarioRegister=this.formRegister.get('usuarioRegister').value;
this.emailRegister=this.formRegister.get('emailRegister').value;

this.contraseniaRegister=this.formRegister.get('contraseniaRegister').value;
console.log(this.usuarioRegister+"  "+ this.emailRegister+"  "+ this.contraseniaRegister)

}





}
}

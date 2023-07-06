import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { response } from 'express';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
  export class UserService {
    user : User ;
    username : string='';
    error: string= '';

    constructor(private http: HttpClient, private router: Router) {
    }


    register(user : User){
    const url ='http://localhost:3000/user/register';; // Reemplaza esto con la URL real de tu servicio Node.js
     // Aquí debes agregar los datos que deseas enviar al servidor
     this.user = {
      username: user.email,
      email: user.email,
      password: user.password,
      name: user.name
      };
      this.http.post(url, user).pipe(
        tap(response => {
          console.log("el usuario se creo exitosamente",response);
        }),
        catchError(error => {
          // Aquí puedes manejar cualquier error que ocurra durante la solicitud
          throw error;
        })
      ).subscribe();
      this.username=user.username;
    }

    verifyCode(code){
      var formCode = {
        username: this.username,
        code : code
      }
      const url ='http://localhost:3000/user/verifyCode'
      this.http.post(url,formCode).pipe(
        tap(response => {
          console.log("se confirmo la cuenta",response);
        }),
        catchError(error => {
          // Aquí puedes manejar cualquier error que ocurra durante la solicitud
          throw error;
        })
      ).subscribe();
    }
    deleteDataUser():void{
      this.user = Object.assign('',this.user);
    }
    login(userData){
      var formLogin = {
        username: userData.Username,
        password : userData.Password
      }
      const url ='http://localhost:3000/user/login'
      return this.http.post(url,formLogin).pipe(
        tap(response => {
          console.log("Inicio exitoso!",response);
        }),
        catchError(error => {
          if (error.status === 500) {
            // Mostrar mensaje de error en el componente, por ejemplo:
          } else {
            // Manejo de otros errores
            // Mostrar mensaje de error en el componente, por ejemplo:
          }
          return throwError(error);
        })
      )
    }
}

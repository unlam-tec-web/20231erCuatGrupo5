import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse  } from '@angular/common/http';
import { tap, catchError} from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
  user : User ;
  username : string='';

  constructor(private http: HttpClient, private router: Router) {
  }

register(user: User) {
  const url = 'http://localhost:3000/user/register'; // Reemplaza esto con la URL real de tu servicio Node.js
  return this.http.post(url, user).pipe(
    tap(response => {
      this.username=user.username;
    }),
    catchError(error => { 
      return throwError(error); // Relanza el error para que se pueda manejar en el componente si es necesario
    })
  );
}

verifyCode(code){
  var formCode = {
    username: this.username,
    code : code
  }
  const url ='http://localhost:3000/user/verifyCode'
  return this.http.post(url,formCode).pipe(
    tap(response => {
    }),
    catchError(error => {
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
      return throwError(error);
    })
  );
}
verifyCodeWithEmail(code,email){
  var formCode = {
    username: email,
    code : code
  }
  const url ='http://localhost:3000/user/verifyCode'
  return this.http.post(url,formCode).pipe(
    tap(response => {
    }),
    catchError(error => {
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
      return throwError(error);
    })
  );
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
  return this.http.post(url,formLogin, { observe: 'response' }).pipe(
    tap((response : HttpResponse<any>) => {
      console.log(response.headers.get('Set-Cookie'));
    }),
    catchError(error => {
      return throwError(error);
    })
  )
}
}

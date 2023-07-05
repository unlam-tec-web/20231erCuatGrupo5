import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"
import { Observable } from "rxjs"
import { usuario } from "src/models/usuario"



export class UserService {

    public http = inject(HttpClient);
    private urlUsuarios = 'http://localhost:3000/GetUsersList';

  getLocalUsers(): Observable<usuario[]>{
    return this.http.get<usuario[]>(this.urlUsuarios);
  }
}
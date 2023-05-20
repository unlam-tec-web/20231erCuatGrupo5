import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiProductos = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

    /*public getProducts(): any {

      return fetch(this.apiProductos);
    }*/
    public getProducts(): Observable<any> {
      return this.http.get<any>(this.apiProductos);
    }
}

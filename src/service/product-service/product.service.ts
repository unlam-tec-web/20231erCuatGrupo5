import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {product} from "../../app/model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlProductos = 'http://localhost:3000/product/GetProducts';
  private urlDetalleProducto = 'http://localhost:3000/product/GetProduct';
  private products: any[];
  private productosFiltrados: any[];
  _products : product[] = [];

  public http = inject(HttpClient)

  getLocalProducts(): Observable<product[]>{
    return this.http.get<product[]>(this.urlProductos)
  }

  getLocalProductById(id:number): Observable<product[]> {
    const url = `${this.urlDetalleProducto}/${id}`;
    return this.http.get<product[]>(url);
  }

}

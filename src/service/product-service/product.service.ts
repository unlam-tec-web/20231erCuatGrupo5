import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import {product} from "../../app/model/product";
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  getLocalProducts(): Observable<product[]>{
    return this.http.get<product[]>(this.urlProductos)
  }

  getLocalProductById(id:number): Observable<product[]> {
    const url = `${this.urlDetalleProducto}/${id}`;
    return this.http.get<product[]>(url);
  }

  agregarProducto(_productData: product){ /*_nro: number, _nombre:string, _stock: number, _img:string, _precio: number, _marca:string, _clasif:string, _descrip:string */
    const url ='http://localhost:3000/product/AddProducto';

    const datosProducto = {
      id: _productData.id,
      nombre: _productData.nombre,
      stock: _productData.stock,
      imagen: _productData.imagen,
      precio: _productData.precio,
      marca: _productData.marca,
      clasificacion: _productData.clasificacion,
      descripcion: _productData.descripcion
    };

    this.http.post(url, datosProducto).pipe(
      tap(response => {
        console.log("el PRODUCTO se creo exitosamente",response);
        alert("Producto creado exitosamente");
        this.router.navigate(['/home']);
      }),
      catchError(error => {
        // Aquí puedes manejar cualquier error que ocurra durante la solicitud
        throw error;
      })
    ).subscribe();

  }
}

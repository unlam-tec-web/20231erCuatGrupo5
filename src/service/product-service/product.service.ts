import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {product} from "../../app/model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlProductos = 'http://localhost:3000/product/GetProducts';
  private products: any[];
  private productosFiltrados: any[];
  _products : product[] = [];

  public http = inject(HttpClient)

  getLocalProducts(){
    return this.http.get<product[]>(this.urlProductos)
  }


  //constructor(private http: HttpClient) { }

  public getProductos(): Observable<any> {
    return this.http.get<any>(this.urlProductos)
  }

  public getProductosPorCategoria(): Observable<any> {
    return this.getProductos()
      .pipe(
        map((response: any) => {
          //Obtengo todos los productos de la API
          this.products = response.products;

          //Filtro por la categoría que necesito
          this.productosFiltrados = this.filtrarProductosPorCategoria(this.products);

          return this.productosFiltrados;
        })
      );
  }

  public getProductosPorDescuento(): Observable<any> {
    return this.getProductos()
      .pipe(
        map((response:any)=>{
          this.products = response.products;
          this.productosFiltrados = this.filtrarProductosPorDescuento(this.products);

          return this.productosFiltrados;
        })
      );
  }

  getProductoPorId(id:number): Observable<any> {
    const url = `${this.urlProductos}/${id}`;
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          console.log(res);
          return res;
        })
      );
  }

  private filtrarProductosPorCategoria(productos: any[]): any[] {
    let prodElectronicos = [];

    for(let i=0;i<productos.length;i++){
      if(productos[i].category=="smartphones" || productos[i].category=="laptops"){
        prodElectronicos.push(productos[i]);
      }
    }
    return prodElectronicos;
  }

  //Para que muestre menos productos en el home - Revisar top/limit
  private filtrarProductosPorDescuento(productos: any[]): any[] {
    let prodElectronicos = [];
    let arrProductos = this.filtrarProductosPorCategoria(productos);

    for(let i=0;i<arrProductos.length;i++){
      if(arrProductos[i].discountPercentage>13){
        prodElectronicos.push(arrProductos[i]);
      }
    }
    return prodElectronicos;
  }

}

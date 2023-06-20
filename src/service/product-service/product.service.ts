import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NavComponent } from 'src/app/components/nav/nav.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlProductos = 'https://dummyjson.com/products';
  private products: any[]; 
  private productosFiltrados: any[];


  constructor(private http: HttpClient) { }

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

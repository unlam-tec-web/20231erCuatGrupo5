import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
          this.products = response;

          //Lo convierto a un array
          let arrProductos = Object.values(this.products);

          //Filtro por la categoría que necesito
          this.productosFiltrados = this.filtrarProductosPorCategoria(arrProductos);

          return this.productosFiltrados;
        })
      );
  }

  public getProductosPorDescuento(): Observable<any> {
    return this.http.get<any>(this.urlProductos)
    .pipe(
      map((response:any)=>{
        this.products = response;
        let arrProductos = Object.values(this.products);

        this.productosFiltrados = this.filtrarProductosPorDescuento(arrProductos);

        return this.productosFiltrados;
      })
    );
  }

  private filtrarProductosPorCategoria(productos: any[]): any[] {
    let prodElectronicos = [];
    let arrProductos = productos[0];

    for(let i=0;i<arrProductos.length;i++){
      if(arrProductos[i].category=="smartphones" || arrProductos[i].category=="laptops"){
        prodElectronicos.push(arrProductos[i]);
      }
    }
    return prodElectronicos;
  }
  
  //Provisorio para que muestre menos productos en el home
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

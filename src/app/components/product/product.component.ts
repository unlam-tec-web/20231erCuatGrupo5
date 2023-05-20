import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/products-service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  data: any = [];
  product = []; 

  constructor(private apiService: ApiService){ }

  ngOnInit(): void {
    this.fillData();
  }

  fillData(): any[] {
    
    this.apiService.getProducts()
    .subscribe(data => {
      this.data = data;
      let producto = Object.values(data);

      this.product = this.getProductoPorCategoria(producto);
    });
    return this.product;
  }

  getProductoPorCategoria(productos: any[]): any[] {
    let prodElectronicos = [];
    let arrProductos = productos[0];
    for(let i=0;i<arrProductos.length;i++){
      if(arrProductos[i].category=="smartphones" || arrProductos[i].category=="laptos"){
        prodElectronicos.push(arrProductos[i]);
      }
    }
    return prodElectronicos;
  }

}

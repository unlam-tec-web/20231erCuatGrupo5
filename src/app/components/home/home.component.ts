import {Component, OnInit} from '@angular/core';
import { ProductService } from 'src/service/product-service/product.service';

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productosInicio: any[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  /*getProductos(): any[] {
    this.productService.getProductosPorDescuento()
      .subscribe(values => {
        this.productosInicio = values;
        console.log(this.productosInicio);
      });
    return this.productosInicio;
  }*/

}

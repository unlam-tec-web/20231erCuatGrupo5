import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/product-service/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productos: any[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
   this.getProductos();
  }

  getProductos(): any[] {
    this.productService.getProductos()
    .subscribe(values => {
      this.productos = values.products;
    });
    return this.productos;
  }
}

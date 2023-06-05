import { Component } from '@angular/core';
import { ProductService } from 'src/service/product-service/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
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

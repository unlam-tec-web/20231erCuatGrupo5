import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/service/product-service/product.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productos: any[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): any[] {
    this.productService.getProductosPorDescuento()
    .subscribe(values => {
      this.productos = values;
      console.log(this.productos);
    });
    return this.productos;
  }
  
}

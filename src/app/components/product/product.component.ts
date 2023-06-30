import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/model/product';
import { CarritoService } from 'src/service/carrito.service';
import { ProductService } from 'src/service/product-service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  

  @Input() productos: product[]=[];
  sus : any;

  constructor(private carritoService:CarritoService,private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): product[] {
    this.sus= this.productService.getLocalProducts()
    .subscribe((data:product[])=>{
      this.productos=data;
    });
    return this.productos;
  }

  AgregarProducto(producto) {
    let product = {
      cantidad: 1,
      id:producto.id,
      productos: producto
    }
    this.carritoService.agregarProducto(product)
   
  }
}

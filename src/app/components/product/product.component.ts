import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    this.sus= this.productService.getLocalProducts()
    .subscribe((data:product[])=>{
    this.productos=data;
    })
   }

  AgregarProducto(producto, index: number) {
    let product = {
      cantidad: 1,
      index: index,
      productos: producto
    }
    this.carritoService.agregarProducto(product, index)
    console.log(product);
    console.log(product.productos.id)
  }
}

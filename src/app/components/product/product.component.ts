import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/model/product';
import { ProductService } from 'src/service/product-service/product.service';
import{carritoService}from 'src/service/servicio-carrito';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  

  @Input() productos: product[]=[];
  sus : any;

  constructor(private productService: ProductService,private servCarrito:carritoService) {
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

  AgregarProducto(producto:product,cant:number) {
 
    this.servCarrito.addProducto(producto,cant)


   
  }
}
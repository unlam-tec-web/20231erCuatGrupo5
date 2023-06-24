import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from 'src/service/carrito.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  

  @Input() productos: any[];


  constructor(private carritoService:CarritoService) {
  }

  ngOnInit(): void { }
 AgregarProducto(producto,index:number){ 
  let product={
    cantidad:1,
    index:index,
    productos:producto
  }
this.carritoService.agregarProducto(product,index)
console.log(product);
console.log(product.productos.id)

 



}

}

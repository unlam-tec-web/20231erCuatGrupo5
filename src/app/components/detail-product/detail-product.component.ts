import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/service/carrito.service';

import { ProductService } from 'src/service/product-service/product.service';
import { product } from 'src/app/model/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  producto: any;
  @Input() productos: product[]=[];
  private respuesta;
  existeProducto:boolean;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private carritoService:CarritoService
  ) { }

  ngOnInit(): void {
    this.getDetalleProducto();


  }
  
  getDetalleProducto(): any {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.respuesta = this.productService.getLocalProductById(id)
    .subscribe((data:product[])=>{
      this.producto = data;
    });
   
    this.existeProducto=this.carritoService.existeProduto(id)

    return this.producto;
  }
  AgregarProducto(producto:any) {
    let product = {
      cantidad: 1,
      id:producto.id,
      productos: producto

    }
    this.existeProducto=this.carritoService.existeProduto(product.id)

     this.carritoService.agregarProducto(product)
     console.log(this.existeProducto)
     this.existeProducto=this.carritoService.existeProduto(producto.id)


  }
  eliminarProducto(producto:any){
    this.existeProducto=this.carritoService.existeProduto(producto.id)

    this.carritoService.eliminarProducto(producto.id)
    this.existeProducto=this.carritoService.existeProduto(producto.id)

 






  }

}

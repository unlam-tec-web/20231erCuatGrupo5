import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{carritoService}from 'src/service/servicio-carrito';

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
    private carritoService:carritoService
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
    this.existeProducto=this.carritoService.verificarExistencia(id)
    return this.producto;
  }
  AgregarProducto(producto:any) {
  

     this.carritoService.addProducto(producto,1)
     this.existeProducto=this.carritoService.verificarExistencia(producto.id)


  }
  eliminarProducto(producto:any){
this.carritoService.eliminarDeDetalle(producto.id)

this.existeProducto=this.carritoService.verificarExistencia(producto.id)







  }

}

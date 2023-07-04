import { Router } from '@angular/router';
import { PedidoService } from '../../../service/product-service/pedido.service'
import { Component, TemplateRef, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {  carritoService} from 'src/service/servicio-carrito';
import {carrito}from '../../../models/carrito'



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']

})
export class NavComponent implements OnInit{

  productos ;
cantProductos;
cproduct;
ProductosCarrito:carrito[]=[];
miTemplate: TemplateRef<any>;
  closeResult: string;

  sumaTotal = 0;

  constructor(private offcanvasService: NgbOffcanvas, alertConfig: NgbAlertConfig,  private router: Router, private _pedidoService: PedidoService, public dialog : MatDialog,private servCarrito:carritoService) {
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.productos = null;
  



  }
  ngOnInit(): void {
    this.servCarrito.cantproduct$.subscribe(carritoService=>{
      this.cproduct=carritoService;
    });
this.servCarrito.productosDelCarrito$.subscribe(carritoservie=>{
  this.ProductosCarrito=carritoservie;
});
this.servCarrito.valorTotal$.subscribe(carritoValorTotal=>{
  this.sumaTotal=carritoValorTotal;
});

  }

  IrAInicio() {
    this.router.navigate(['/home']);
  }

  openEnd(miTemplate) {
   
    this.offcanvasService.open(miTemplate, { position: 'end',animation:true });
    this.verProductos();
   

 
  }
  
  openDialog():void{
    const dialogRef = this.dialog.open(LoginComponent,{},);
    dialogRef.afterClosed().subscribe(res => {

   
    });
  }


  verProductos() {

  }
  sumarCantidadProducto(index: number) {

  this.servCarrito.sumarCantidad(index);
  }
  comprar() {
    this._pedidoService.setData(this.sumaTotal);
    this._pedidoService.setProductos(this.carritoService.MostrarProducto());
    this.router.navigate(['/pedido']);

  }
  verificarLoginDeUsuario(){
    
  }

  restarCantidadProducto(index: number) {
   
    this.servCarrito.restarCantidad(index);
    
}


  eliminarProducto(index:number) {
    
    this.servCarrito.eliminarProducto(index)
 
  }
}
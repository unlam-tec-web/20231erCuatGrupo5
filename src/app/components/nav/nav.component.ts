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
  login:boolean;
  hidePanel: boolean;
  ProductosCarrito:carrito[]=[];
  miTemplate: TemplateRef<any>;
  closeResult: string;

  sumaTotal = 0;

  constructor(private offcanvasService: NgbOffcanvas, alertConfig: NgbAlertConfig,  private router: Router, private _pedidoService: PedidoService, public dialog : MatDialog,private servCarrito:carritoService) {
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.productos = null;
    this.hidePanel = false;
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
this.verificarLOgin();

  }

  IrAInicio() {
    this.router.navigate(['/home']);
  }

  openEnd(miTemplate) {
   
    this.offcanvasService.open(miTemplate, { position: 'end',animation:true });
  

  }
  
  openDialog():void{
 
if(!this.login){     
    const dialogRef = this.dialog.open(LoginComponent,{},);
    dialogRef.afterClosed().subscribe(res => {
this.verificarLOgin()
   
    });}
    else{
      sessionStorage.removeItem("login");
      sessionStorage.removeItem("loginAdmin");
      this.verificarLOgin();
    }

  }


  sumarCantidadProducto(index: number) {

  this.servCarrito.sumarCantidad(index);
  }
  comprar() {
if (this.verificarLOgin()){
  this._pedidoService.setData(this.sumaTotal);
  this.router.navigate(['/pedido']);

}else{
  this.openDialog()
 
}

   

  }


  restarCantidadProducto(index: number) {
   
    this.servCarrito.restarCantidad(index);
    
}


  eliminarProducto(index:number) {
    
    this.servCarrito.eliminarProducto(index)
 
  }

  verificarLOgin(){
    let usuario = sessionStorage.getItem("login");
    let admin = sessionStorage.getItem("loginAdmin");

    if(usuario){
      return this.verificarUsuario(usuario);
    }else {
      return this.verificarUsuario(admin)?this.hidePanel=true:this.hidePanel=false;
    }
  }

  private verificarUsuario(user: string): boolean{
    if (user==null){
      this.login=false;
     }else{
       this.login=true; 
     }
     return this.login;
  }

  IrACargaDeProducto(){
      this.router.navigate(['/home']);
  }
}
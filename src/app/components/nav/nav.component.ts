import { Router } from '@angular/router';
import { PedidoService } from '../../../service/product-service/pedido.service'
import { Component, TemplateRef, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarritoService } from 'src/service/carrito.service';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";


const productos = [
  {
    "descripcion": "Celular samsung S23",
    "cantidad": 1,
    "imagen": "assets/img/Header.png",
    "precio": 60000
  },
  {
    "descripcion": "Celular samsung A04e", "imagen": "assets/img/shopping.jpg",
    "cantidad": 1, "precio": 14000
  },


];

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']

})
export class NavComponent {

  productos ;


  closeResult: string;
  // productos = productos;

  sumaTotal = 0;

  constructor(private offcanvasService: NgbOffcanvas, alertConfig: NgbAlertConfig, private carritoService: CarritoService, private router: Router, private _pedidoService: PedidoService, public dialog : MatDialog) {
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.productos = null;



  }

  IrAInicio() {
    this.router.navigate(['/home']);
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
    this.verProductos();
    this.sumaTotalProductos()
    console.log(this.productos)


  }

  cerrar() {

    if (this.sumaTotal == 0) {
      localStorage.clear();

    } else {
      localStorage.setItem("carrito", JSON.stringify(this.productos));

    }


  }

  openDialog():void{
    const dialogRef = this.dialog.open(LoginComponent,{},);
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }


  verProductos() {

    if (this.carritoService.MostrarProducto == null) {
       this.productos = null;
    } else {
      this.productos = this.carritoService.MostrarProducto();
    }

  }

  sumarCantidadProducto(index: number) {
    this.productos[index].cantidad = this.productos[index].cantidad + 1;
    this.sumaTotalProductos();

  }
  comprar() {
    this._pedidoService.setData(this.sumaTotal);
    this.router.navigate(['/pedido']);
  }

  restarCantidadProducto(index: number) {
    this.productos[index].cantidad = this.productos[index].cantidad - 1;
    this.sumaTotalProductos();

    if (this.productos[index].cantidad == 0) {
      this.eliminarProducto(index);
    }
  }

  sumaTotalProductos() {
    this.sumaTotal = 0;
    let suma = 0;
    if (this.productos == null) {
    } else {
      for (let i = 0; i < this.productos.length; i++) {
        suma = (this.productos[i].productos.precio * this.productos[i].cantidad) + suma;
      }

    }
    this.sumaTotal = this.sumaTotal + suma;

  }

  eliminarProducto(index: number) {
    
    //this.carritoService.eliminarProducto(index)
    this.productos.splice(index, 1);
    this.sumaTotalProductos();
    
  }
}

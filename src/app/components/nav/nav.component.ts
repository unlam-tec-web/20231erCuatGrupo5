import { Component,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import {PedidoService} from '../../../service/product-service/pedido.service'


let cantidad1=1;
let cantidad2=1;

const productos= [
  { "descripcion":"Celular samsung S23",
    "cantidad":cantidad1,
    "imagen":"assets/img/Header.png",
"precio":60000},
{"descripcion":"Celular samsung A04e","imagen":"assets/img/shopping.jpg",
"cantidad":cantidad2,"precio":14000},


];
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']

})
export class NavComponent {

  closeResult: string;
  productos = productos;

  sumaTotal=0;
	constructor(private offcanvasService: NgbOffcanvas ,alertConfig: NgbAlertConfig,private router: Router,private _pedidoService : PedidoService) {
    alertConfig.type = 'success';
		alertConfig.dismissible = false;
  }

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
    //cuando se abre el carrito realiza rl total de los productos
 this.totalPagar();
	}

  totalPagar(){
    this.sumaTotal=0;
    for(let i=0 ; i< productos.length; i++){
      let suma=productos[i].precio * productos[i].cantidad;
      this.sumaTotal=suma+this.sumaTotal
    console.log(productos.length)
     }
  }

sumarCant( index:number){

  this.productos[index].cantidad=this.productos[index].cantidad+1;
  this.totalPagar();

}
restarCant(index:number){
  this.productos[index].cantidad=this.productos[index].cantidad-1;
  this.totalPagar();
  if(this.productos[index].cantidad==0){
    this.eliminarProducto(index)
  }
}

eliminarProducto(index:number){
  this.productos.splice(index,1);
  this.totalPagar();
}
  comprar(){
    this._pedidoService.setData(this.sumaTotal);
    this._pedidoService.setProductos(this.productos);
    this.router.navigate(['/pedido']);
  }
}
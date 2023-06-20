import { Component,TemplateRef,OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertConfig, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarritoService } from 'src/service/carrito.service';





@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']

})
export class NavComponent {

  productos=null;


  closeResult: string;
 // productos = productos;

  sumaTotal=0;
	constructor(private offcanvasService: NgbOffcanvas ,alertConfig: NgbAlertConfig,private carritoService:CarritoService) {
    alertConfig.type = 'success';
		alertConfig.dismissible = false;

 
  }
  
 

	openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
    //this.productos=this.carritoService.MostrarProducto();
    this.verProductos();
    this.sumaTotalProductos()

   
	} 

  cerrar(){

if(this.sumaTotal==0){
  localStorage.clear();

}else{
  localStorage.setItem("carrito",JSON.stringify(this.productos));

}


  }
  verProductos(){
    if(this.carritoService.MostrarProducto==null){
      this.productos=null;
    }else{
      this.productos=this.carritoService.MostrarProducto();
    }

  }
  
  sumarCantidadProducto(index:number){
    this.productos[index].cantidad=this.productos[index].cantidad + 1;

     this.sumaTotalProductos();
    
   
  }
  restarCantidadProducto(index:number){
    this.productos[index].cantidad=this.productos[index].cantidad - 1;
    this.sumaTotalProductos();
   
    if(this.productos[index].cantidad==0){
     this.eliminarProducto(index);
    }
   }
   
   sumaTotalProductos(){
    this.sumaTotal =0;
    let suma=0;
if(this.productos==null){
}else{
   for(let i=0 ; i< this.productos.length; i++){
     suma =(this.productos[i].productos.price * this.productos[i].cantidad)+suma;
   }
  
  }
  this.sumaTotal=this.sumaTotal+suma;

   }
   
   eliminarProducto(index:number){
    this.productos.splice(index,1);
    this.sumaTotalProductos();
   }
 }

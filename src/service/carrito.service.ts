import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
import { PagoComponent } from 'src/app/components/pago/pago.component';


@Injectable({
    providedIn: 'root'
  })
  export class CarritoService {
  productos =Array();
  
    constructor(private http: HttpClient,private _snackBar: MatSnackBar, private router: Router) {}
/* agrego el producto, si da true en verificarCantidad se inserta en el array */ 
 existeProduto(id:number):boolean{
  if(this.carritoVacio()===false){
    let producto=[];
    producto=JSON.parse(localStorage.getItem("carrito"))
    for(let i=0 ; i< producto.length; i++){
      console.log(producto[i].id)
      if(producto[i].id===id){
        console.log("producto  existe")

        return true;
      }
    }
  }
  console.log("producto no existe")
  return false;
 }
    agregarProducto(producto:any) {
     
      if (this.carritoVacio() ){
       
        this.productos.push(producto);
        localStorage.setItem("carrito",JSON.stringify(this.productos))
      }else if(!this.existeProduto(producto.id)){

this.productos.push(producto)
localStorage.setItem("carrito",JSON.stringify(this.productos))
console.log("se guardo")
      }


      }
     
      carritoVacio():boolean{
       let product=JSON.parse(localStorage.getItem("carrito"))
       if(product==null){
        return true
       }
       return false
      }
    //guardo los productos del localstorage en una variable y lo retorno
      MostrarProducto() {
        let product=null;
        product=JSON.parse(localStorage.getItem("carrito"))
       if(!this.carritoVacio()){
      return product;
       }
      }
      /*verifica que si se puede insertar el producto, si ya existe no se podra insertar*/ 
     verificarSiExisteEnCarrito(id:number){
      let boolean;
         let product=this.MostrarProducto()
        if(product==null){
         return boolean= false;
        }else{
         
     for(let i=0 ; i< product.length; i++){
      if(product[i].productos.id===id){
           boolean= true;
          
          break
        }else{
           return boolean =false;
        }
        
        }
      
      }
       return  boolean;
  }


eliminarProducto(id:number){
 let product=this.MostrarProducto()
  console.log(product)
  for(let i=0 ; i< product.length; i++){
    if(product[i].id===id){

product.splice(i,1)  
}
  }

  if(product.length>0){
    localStorage.setItem("carrito", JSON.stringify(product));    
  }else{
    localStorage.clear();
 

}
this.contarProductos();
}
pagar(_total){
  const url ='http://localhost:3000/cart/pagar';; // Reemplaza esto con la URL real de tu servicio Node.js
  const datosPago = {
    total : _total
  }; // Aquí debes agregar los datos que deseas enviar al servidor

  this.http.post(url, datosPago).pipe(
    tap(response => {
      this._snackBar.openFromComponent(PagoComponent, {
        duration: 3000,
        horizontalPosition:'center',
        verticalPosition: 'top'
      });

      setTimeout(() => {
      this.router.navigate(['/home']); // Ruta del componente al que deseas redirigir
      }, 3000); // Retraso en milisegundos antes de la redirección
    }),
    catchError(error => {
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud
      throw error;
    })
  ).subscribe();
}
contarProductos(){
  let cant;
  cant=this.MostrarProducto()
 if(cant!=undefined){
 return cant.length
}else{
return 0;}
}

}
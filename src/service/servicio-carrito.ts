import {carrito} from '../models/carrito'
import {product} from '../models/Producto'
import {BehaviorSubject} from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import { PagoComponent } from 'src/app/components/pago/pago.component';
import { tap, catchError } from 'rxjs/operators';

//QUE SE PUEDA INJECTAR EN OTROS SERVICIO
@Injectable({
    providedIn:'root'
})
export class carritoService{

    miCarrito:carrito[]=[];
    cantTotalDeProductos=0;
    //es para que cuando se agregue un producto este va a actualizarlo en los componentes que lo ttienen subcrt
    cantproduct=new BehaviorSubject<number>(0)
    productosDelCarrito=new BehaviorSubject<carrito[]>([])
    valorTotal=new BehaviorSubject<number>(0)

    cantproduct$=this.cantproduct.asObservable();
    productosDelCarrito$=this.productosDelCarrito.asObservable();
    valorTotal$=this.valorTotal.asObservable();

      constructor(private http: HttpClient,private _snackBar: MatSnackBar, private router: Router){
        this.cargaDeCarrito()
      }
cargaDeCarrito(){
    this.verStorage()

    this.cantproduct.next(this.cantTotalProductos());
    this.productosDelCarrito.next(this.miCarrito);
    this.valorTotal.next(this.getTotal());
}
verStorage(){

    let product=JSON.parse(localStorage.getItem("carrito"))

    if(product!=null && this.miCarrito.length==0){
        for(let i=0;i<product.length;i++){
            let carrito:carrito={cantidad:product[i].cantidad,productos:product[i].productos}
            this.miCarrito.push(carrito);

        }
    }
    else if(product==null && this.miCarrito.length!=0){
        localStorage.setItem("carrito", JSON.stringify(this.miCarrito));    

    }else{
        localStorage.setItem("carrito", JSON.stringify(this.miCarrito));    

    }
}


     verificarExistencia(id:number){
        let existe=false;
    
    for(let i=0;i <this.miCarrito.length;i++){
        if(this.miCarrito[i].productos.id===id){
            existe =true;
        }
    
}
         return existe;
     }
      addProducto( product:product,cant:number){

if(!this.verificarExistencia(product.id)){
   //si this.veridicarExistencia =false
    let cProducto:carrito={cantidad:cant,productos:product}
   //hace que los que tienen implementado el servicio le devuelva el carrito de forma reactiva
    this.miCarrito.push(cProducto)
this.cargaDeCarrito();
   this.verStorage()

}else{
    this.cargaDeCarrito();

}

this.verificarExistencia(product.id)
      }   

      getTotal(){
        return this.miCarrito.reduce((sum,item)=>sum + (item.cantidad * item.productos.precio),0); }

   cantTotalProductos(){
    let cant= this.miCarrito.reduce((sum,item)=>sum + item.cantidad,0);
    return cant;
   }   
   getProductosCarrito(){
    return this.miCarrito
   }
sumarCantidad(index:number){
    this.miCarrito[index].cantidad=this.miCarrito[index].cantidad+1
    this.cantproduct.next(this.cantTotalProductos());
    this.valorTotal.next(this.getTotal());
    localStorage.setItem("carrito", JSON.stringify(this.miCarrito));    



}
restarCantidad(index:number){

    this.miCarrito[index].cantidad=this.miCarrito[index].cantidad-1
    this.cantproduct.next(this.cantTotalProductos());

    if(this.miCarrito[index].cantidad===0){
        this.eliminarProducto(index);
    }
    this.valorTotal.next(this.getTotal());

    this.cantproduct.next(this.cantTotalProductos());
    localStorage.setItem("carrito", JSON.stringify(this.miCarrito));    


}
eliminarProducto(index:number){
    this.miCarrito.splice(index, 1);

    this.valorTotal.next(this.getTotal());
    this.cantproduct.next(this.cantTotalProductos());

    localStorage.setItem("carrito", JSON.stringify(this.miCarrito));    

}
eliminarDeDetalle(id:number){
 for(let i=0;i <this.miCarrito.length;i++){
        if(this.miCarrito[i].productos.id===id){
            this.miCarrito.splice(i, 1);

        }
    
}
this.valorTotal.next(this.getTotal());
    this.cantproduct.next(this.cantTotalProductos());

    localStorage.setItem("carrito", JSON.stringify(this.miCarrito));   
    this.verificarExistencia(id)
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
        this.router.navigate(['/home']);
       


        this.miCarrito.splice(0,this.miCarrito.length);
         localStorage.clear();
        this.cargaDeCarrito();

     
        // Ruta del componente al que deseas redirigir
        }, 3000); // Retraso en milisegundos antes de la redirección
        
    }),
      catchError(error => {
        // Aquí puedes manejar cualquier error que ocurra durante la solicitud
        throw error;
      })
    ).subscribe();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class CarritoService {
  productos=[];
  
    constructor(private http: HttpClient) {}

 
    agregarProducto(producto,id:number) {
    
      if(this.verificarCantidad(id)){
        this.productos.push(producto);

        localStorage.setItem("carrito",JSON.stringify(this.productos))
        alert("el producto se guardo correctamente")
      }
      
 
      }
    //guardo los productos del localstorage en una variable y lo retorno
      MostrarProducto() {
       let product=JSON.parse(localStorage.getItem("carrito"))
       if(product==null){
      return null;
       }else{
        return product;
        
       }
        
   
      }

      verificarCantidad(id:number){
      let boolean;
        let product=null;
        product=this.MostrarProducto()
        if(product==null){
          boolean= true;
        }else{
         
     for(let i=0 ; i< product.length; i++){
      if(product[i].productos.id!=id){
          boolean= true;
       
        }else{
          boolean =false;
          alert("el producto ya existe en su carrito")
        }
        }

      
      }
       return  boolean;
  }

 /* sumarCantidadProducto(index:number){
  this.productos[index].cantidad=this.productos[index].cantidad + 1;
   this.sumaTotalProductos;
   return this.productos
 
}

restarCantidadProducto(index:number){
 this.productos[index].cantidad=this.productos[index].cantidad - 1;
 this.sumaTotalProductos(this.productos);

 if(this.productos[index].cantidad==0){
  this.eliminarProducto(index);
 }
}

sumaTotalProductos(producto:any[]){
  let suma=0;
for(let i=0 ; i< producto.length; i++){
  suma=+(producto[i].productos.price * producto[i].cantidad);
}
return suma;

}

eliminarProducto(index:number){
 this.productos.splice(index,1);
 this.sumaTotalProductos(this.productos);
}*/
}
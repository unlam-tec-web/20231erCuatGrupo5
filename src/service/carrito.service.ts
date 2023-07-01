import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isEmpty } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class CarritoService {
  productos =Array();
  
    constructor(private http: HttpClient) {}
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
contarProductos(){
  let cant;
  cant=this.MostrarProducto()
 if(cant!=undefined){
 return cant.length
}else{
return 0;}}
}
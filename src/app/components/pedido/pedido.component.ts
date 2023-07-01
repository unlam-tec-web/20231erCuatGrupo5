import {FormBuilder, Validators} from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {PedidoService} from '../../../service/product-service/pedido.service'
import {CarritoService} from '../../../service/carrito.service'



@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  
})

export class PedidoComponent{
  sumaTotal: number=0;
  productos : any[];
  constructor(private _formBuilder: FormBuilder,private router: Router,private _pedidoService : PedidoService,private _carritoService : CarritoService) {
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    secondCtrl: ['', Validators.required],
    thirdCtrl: ['', [Validators.required,Validators.pattern('^[a-z]+[a-z0-9._-]+@[a-z]+\.[a-z.]{2,5}$')]],
    fourthCtrl: ['',[Validators.required,Validators.pattern('^[0-9]{8,10}$')]]
  });
  secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
  });

  ngOnInit() {
    this.productos = JSON.parse(localStorage.getItem("productos"));
    this.sumaTotal=this._pedidoService.getData();
  }
  pagar(){
    this._carritoService.pagar(this.sumaTotal);
  }
}

  
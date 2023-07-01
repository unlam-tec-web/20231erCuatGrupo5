import {FormBuilder, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PedidoService} from '../../../service/product-service/pedido.service'
import {CarritoService} from '../../../service/carrito.service'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  
})

export class PedidoComponent implements OnInit{
  sumaTotal: number=0;
  listaProd : any[];
  columnas: string[] = ['descripcion', 'cantidad', 'precio'];

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
    this.listaProd = JSON.parse(localStorage.getItem("carrito"));
    console.log(this.listaProd);
    this.sumaTotal=this._pedidoService.getData();
    console.log(this.sumaTotal);
  }
  pagar(){
    this._carritoService.pagar(this.sumaTotal);
  }
}

  
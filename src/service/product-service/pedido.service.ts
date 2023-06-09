import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PedidoService {
  private totalCarrito: number;

  constructor() { }

  setData(sumaTotal: number) {
    this.totalCarrito = sumaTotal;
  }

  getData() {
    return this.totalCarrito;
  }
}
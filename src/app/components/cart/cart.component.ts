import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
  listaDatos:any[];
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.getDataFormat();
  }

  getDataFormat(){
    const urlAPI = 'https://pokeapi.co/api/v2/pokemon?limit=5&offset=0';
    this.http.get(urlAPI).subscribe((data:any)=>{
    this.listaDatos = Array.from(data.results)
    })
  }
}

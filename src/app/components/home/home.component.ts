import { Component } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  lista = [
    ["Infinity war ", 200],
    ["Infinity war 2", 250],
    ["Infinity war 3", 300],
    ["Infinity war 4", 500],
    ["Infinity war 5", 320],
    ["Infinity war 6", 550],
  ];
}

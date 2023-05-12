import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class navComponent {
constructor(private router:Router){}

}
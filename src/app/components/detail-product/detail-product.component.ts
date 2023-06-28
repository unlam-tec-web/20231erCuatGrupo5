import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/service/product-service/product.service';
import { product } from 'src/app/model/product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  producto: any;
  @Input() productos: product[]=[];
  private respuesta;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getDetalleProducto();
  }
  
  getDetalleProducto(): any {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.respuesta = this.productService.getLocalProductById(id)
    .subscribe((data:product[])=>{
      this.producto = data;
    });
    return this.producto;
  }

}

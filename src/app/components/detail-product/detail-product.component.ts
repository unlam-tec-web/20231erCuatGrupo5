import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/service/product-service/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {

  producto: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
   this. getDetalleProducto();
  }
  
  getDetalleProducto(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductoPorId(id)
      .subscribe(resProducto => 
        this.producto = resProducto
      );
  }

}

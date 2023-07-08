import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/model/product';
import { ProductService } from 'src/service/product-service/product.service';

@Component({
  selector: 'app-carga-producto',
  templateUrl: './carga-producto.component.html',
  styleUrls: ['./carga-producto.component.css']
})
export class CargaProductoComponent implements OnInit{

  LoadForm: FormGroup;
  nroProd: number;
  nombreProd: string;
  stockProd: number;
  imgProd: string;
  precioProd: number;
  marcaProd: string;
  clasProd: string;
  desProd: string;

  constructor(private productService: ProductService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.LoadForm =this.formBuilder.group({
      nombreProd:new FormControl('', Validators.required), /*['', Validators.required],*/
      nroProd:new FormControl('', Validators.required),
      stockProd:new FormControl('', Validators.required),
      imgProd:new FormControl('', Validators.required),
      precioProd:new FormControl('', Validators.required),
      marcaProd:new FormControl('', Validators.required),
      clasProd:new FormControl('', Validators.required),
      desProd:new FormControl('', Validators.required),

  });
    
  }

  LoadProducto():void{
    const productData: product = {
      id: parseInt(this.nroProd = this.LoadForm.get('nroProd').value),
      nombre: this.nombreProd = this.LoadForm.get('nombreProd').value,
      stock: parseInt(this.stockProd = this.LoadForm.get('stockProd').value),
      imagen: this.imgProd = this.LoadForm.get('imgProd').value,
      precio: parseInt(this.precioProd = this.LoadForm.get('precioProd').value),
      marca: this.marcaProd = this.LoadForm.get('marcaProd').value,
      clasificacion: this.clasProd = this.LoadForm.get('clasProd').value,
      descripcion: this.desProd = this.LoadForm.get('desProd').value
    };
    this.productService.agregarProducto(productData);

  }
}

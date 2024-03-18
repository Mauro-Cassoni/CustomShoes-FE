import { Component } from '@angular/core';
import { ApiShopService } from '../../Services/api-shop.service';
import { IProduct } from '../../Models/i-product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private apiSvc: ApiShopService,
  ){}

  products: IProduct[] = [];

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.apiSvc.getAll().subscribe(data => {
      this.products = data.obj.content.filter(product => product.onSale === true);
    });
  }


}

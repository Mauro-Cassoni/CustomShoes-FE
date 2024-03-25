import { CartService } from './../../Services/cart.service';
import { Component } from '@angular/core';
import { ApiShopService } from '../../Services/api-shop.service';
import { IProduct } from '../../Models/i-product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private apiShopService: ApiShopService,
    private cartService: CartService,
  ){}

  products: IProduct[] = [];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.apiShopService.getAll().subscribe(data => {
      this.products = data.obj.content.filter(product => product.onSale === true);
    });
  }

  addToCart(event: MouseEvent, productId: number) {
    event.stopPropagation();
    const productToAdd = this.products.find(product => product.id === productId);
    if (productToAdd) {
      this.cartService.addToCart(productToAdd);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added to cart successfully.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  }


}

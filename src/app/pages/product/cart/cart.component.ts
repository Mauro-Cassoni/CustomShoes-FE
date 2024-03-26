import { Component } from '@angular/core';
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(
    public cartService: CartService,
    private authService : AuthService,
  ){}

  isLoggedIn$!:boolean

  ngOnInit(){
    this.authService.isLoggedIn$.subscribe(res => this.isLoggedIn$ = res);
    this.cartService.getCartItems();
  }

  total(){
    let total =0;
    for (let i of this.cartService.getCartItems()){
      total += i.price;
    }
    return total;
  }

  removeAll(){
    this.cartService.clearCart();
    this.cartService.getCartItems();
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
  }

}

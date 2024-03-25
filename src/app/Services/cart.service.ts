import { Injectable } from '@angular/core';
import { IProduct } from '../Models/i-product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartItems: IProduct[] = this.getCartItemsFromLocalStorage();
  private cartKey = 'cart';

  addToCart(product: IProduct) {
    this.cartItems.push(product);
    this.saveCartItemsToLocalStorage();
    console.log(this.cartItems);

  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartItemsToLocalStorage();
    return this.cartItems;
  }

  private saveCartItemsToLocalStorage() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  private getCartItemsFromLocalStorage(): IProduct[] {
    const storedCart = localStorage.getItem(this.cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }
}
